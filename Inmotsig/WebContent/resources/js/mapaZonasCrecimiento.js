window.onload = function() {
	cargarMapa();
	cargarTabla();
}

function cargarMapa() {
	// esto es por un bug en para wfs
	var _class = OpenLayers.Format.XML;
	var originalWriteFunction = _class.prototype.write;

	var patchedWriteFunction = function() {
		var child = originalWriteFunction.apply(this, arguments);

		// NOTE: Remove the rogue namespaces as one block of text.
		child = child.replace(new RegExp('xmlns:NS\\d+="" NS\\d+:', 'g'), '');

		return child;
	}

	_class.prototype.write = patchedWriteFunction;
	// aca termina lo del bug

	var wfsTasmaniaRoads;
	var saveStrategy;
	saveStrategy = new OpenLayers.Strategy.Save();

	wfsTasmaniaRoads = new OpenLayers.Layer.Vector("WFS", {
		strategies : [ new OpenLayers.Strategy.BBOX(), saveStrategy ],
		protocol : new OpenLayers.Protocol.WFS({
			url : "http://localhost:8080/geoserver/wfs",
			featureType : "zonascrecimiento",
			featureNS : "http://www.openplans.org/topp",
			geometryName : "geom",
		})
	});

	mapa = new OpenLayers.Map("mapa");

	var wmsTasmania = new OpenLayers.Layer.WMS("Montevideo calles",
			"http://localhost:8080/geoserver/wms", {
				layers : 'tsig_p3:montevideo_ejes',
				transparent : 'false',
				format : 'image/png',
				isBaseLayer : 'true',

			});

	var panel = new OpenLayers.Control.Panel({
		displayClass : "olControlEditingToolbar"
	});

	var draw = new OpenLayers.Control.DrawFeature(wfsTasmaniaRoads,
			OpenLayers.Handler.Polygon, {
				handlerOptions : {
					freehand : false,
					multi : true
				},
				displayClass : "olControlDrawFeaturePoint"

			});

	draw.events.register('featureadded', draw, agregarDatos);

	var f;
	function agregarDatos(e) {
		f = e.feature;

		f.popup = new OpenLayers.Popup.FramedCloud(
				"pop",
				f.geometry.getBounds().getCenterLonLat(),
				null,
				'<form >Nombre de la zona:<br/><input type="text" id="nombreZona2" name="nombreZona" /></form>',
				null, true);
		mapa.addPopup(f.popup);

	}
	;

	/*var attributes = {
		direccion : "emilio"
	};*/
	var select = new OpenLayers.Control.SelectFeature(wfsTasmaniaRoads);
	mapa.addControl(select);
	select.activate();

	function onPopupClose(evt) {
		selectControl.unselect(selectedFeature);
	}
	;

	wfsTasmaniaRoads.events.on({
		featureselected : function(event) {
			var feature = event.feature;
			feature.popup = new OpenLayers.Popup.FramedCloud("pop",
					feature.geometry.getBounds().getCenterLonLat(), null,
					'<form >Nombre:<br/><input type="text" id="nombreZona2" value="'
							+ feature.attributes.nombre
							+ '" name="nombreZona2" />', null, true);
			mapa.addPopup(feature.popup);
		},

		featureunselected : function(event) {
			var feature = event.feature;
			mapa.removePopup(feature.popup);
			feature.popup.destroy();
			feature.popup = null;
		}

	});

	var save = new OpenLayers.Control.Button({
		displayClass : 'saveButton',
		trigger : function() {
			f.attributes.nombre = document.getElementById("nombreZona2").value;
			f.attributes.grado_interes = 0;
			saveStrategy.save();
			mapa.removePopup(f.popup);
			f.popup.destroy();
			f.popup = null;
		},
		title : 'Save changes'
	});

	panel.addControls([ select, draw, save ]);
	mapa.addControl(panel);

	mapa.addLayer(wmsTasmania);

	mapa.addLayer(wfsTasmaniaRoads);

	info = new OpenLayers.Control.WMSGetFeatureInfo({
		url : 'http://localhost:8080/geoserver/wfs',
		title : 'Zona info',
		queryVisible : true,
		eventListeners : {
			getfeatureinfo : function(event) {
				mapa.addPopup(new OpenLayers.Popup.FramedCloud("chicken", mapa
						.getLonLatFromPixel(event.xy), null, event.text, null,
						true));
			}
		}
	});
	mapa.addControl(info);
	info.activate();

	mapa.zoomToMaxExtent();
	var lonlat = new OpenLayers.LonLat(-56.21, -34.81).transform(
			new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection(
					"EPSG:32721"));
	mapa.setCenter(lonlat, 12);

	mapa.addControl(new OpenLayers.Control.LayerSwitcher(true));
	mapa.addControl(new OpenLayers.Control.MousePosition({
		numDigits : 6
	}));
	mapa.addControl(new OpenLayers.Control.ScaleLine());

}

function cargarTabla(){
	var wfs = new OpenLayers.Protocol.WFS({
	    url: "http://localhost:8080/geoserver/wfs",
	    featureType: "zonascrecimiento",
	    featureNS: "http://www.openplans.org/topp",
	    geometryName: "geom"});

	
	wfs.read({
	    callback: function(response) {
	        if(response.features.length > 0) {
	            console.log(response.features[0].data);
	            var lista = [];
	            var listaFinal = new Array();
	            for (var int = 0; int < response.features.length; int++) {
	            	var obj = {nombre: response.features[int].data.nombre, grado_interes: response.features[int].data.grado_interes };
	            	//var data = response.features[int].data;
	            	listaFinal.push(obj);
				}
	            
	            jQuery('#tablaZonas').html( '<table id="table1" class="table"></table>' );
	       	 
	            jQuery('#table1').dataTable( {
	    	        data: listaFinal,
	    	        columns: [
	    	            { data: 'nombre' },
	    	            { data: 'grado_interes' }
	    	        ]
	    	    } );
	            //document.getElementById("zonasGuardadas").value = response.features;
	            //document.getElementById("table1").value = response.features;
	        } else {
	            console.log('Whoops, no features returned!');
	        }
	    }
	});
	
	/*var yourFilter = new OpenLayers.Filter.Comparison({
	    type: OpenLayers.Filter.Comparison.EQUAL_TO,
	    property: yourPropertyName,
	    value: yourPropertyValue
	});

	protocol.read({
	    flter: yourFilter,
	    callback: yourCallback
	});*/
	
	   
	
}
