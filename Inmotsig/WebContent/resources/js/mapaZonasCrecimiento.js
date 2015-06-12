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

	var node = document.getElementById("mapa");
	while (node.hasChildNodes()) {
	    node.removeChild(node.lastChild);
	}
	
	var zonas;
	var saveStrategy;
	saveStrategy = new OpenLayers.Strategy.Save();
	
	/*Estilos*/
	var style = new OpenLayers.Style();

	var baja = new OpenLayers.Rule({
	  filter: new OpenLayers.Filter.Comparison({
	      type: OpenLayers.Filter.Comparison.EQUAL_TO,
	      property: "demanda",
	      value: "baja",
	  }),
	  symbolizer: {fillColor: "green",
	               fillOpacity: 0.5, strokeColor: "black"}
	});

	var media = new OpenLayers.Rule({
	  filter: new OpenLayers.Filter.Comparison({
	      type: OpenLayers.Filter.Comparison.EQUAL_TO,
	      property: "demanda",
	      value: "media",
	  }),
	  symbolizer: {fillColor: "red",
	               fillOpacity: 0.7, strokeColor: "black"}
	});
	
	var alta = new OpenLayers.Rule({
		  filter: new OpenLayers.Filter.Comparison({
		      type: OpenLayers.Filter.Comparison.EQUAL_TO,
		      property: "demanda",
		      value: "alta",
		  }),
		  symbolizer: {fillColor: "blue",
		               fillOpacity: 0.7, strokeColor: "black"}
		});
	
	var todas = new OpenLayers.Rule({
		// apply this rule if no others apply
		elseFilter : true,
		symbolizer : {
			fillColor: "grey",
            fillOpacity: 0.7, strokeColor: "black"
		}
	});

	style.addRules([baja, media, alta, todas]);
	/*fin estilo*/

	zonas = new OpenLayers.Layer.Vector("WFS", {
		strategies : [ new OpenLayers.Strategy.BBOX(), saveStrategy ],
		protocol : new OpenLayers.Protocol.WFS({
			url : "http://localhost:8080/geoserver/wfs",
			featureType : "zonascrecimiento",
			featureNS : "http://www.openplans.org/topp",
			geometryName : "geom",
		}),
		styleMap : new OpenLayers.StyleMap(style)
	});

	mapa = new OpenLayers.Map("mapa");

	var osm = new OpenLayers.Layer.OSM();
	
	var panel = new OpenLayers.Control.Panel({
		displayClass : "olControlEditingToolbar"
	});

	var draw = new OpenLayers.Control.DrawFeature(zonas,
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

	};

	/*
	 * var attributes = { direccion : "emilio" };
	 */
	var select = new OpenLayers.Control.SelectFeature(zonas);
	mapa.addControl(select);
	select.activate();

	function onPopupClose(evt) {
		selectControl.unselect(selectedFeature);
	}
	;

	zonas.events.on({
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
	
//Boton de guardar
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

	mapa.addLayer(osm);
	var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform
																	// from WGS
																	// 1984
	var toProjection = new OpenLayers.Projection("EPSG:900913"); // to
																	// Spherical
																	// Mercator
																	// Projection
	var position = new OpenLayers.LonLat(-56.21, -34.81).transform(
			fromProjection, toProjection);

	mapa.addLayer(zonas);

	mapa.zoomToMaxExtent();
	var lonlat = new OpenLayers.LonLat(-56.1880518, -34.8527097).transform(
			new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection(
					"EPSG:32721"));
	// mapa.setCenter(lonlat, 12);
	mapa.setCenter(position, 12);

	mapa.addControl(new OpenLayers.Control.LayerSwitcher(true));
	mapa.addControl(new OpenLayers.Control.MousePosition({
		numDigits : 6
	}));
	mapa.addControl(new OpenLayers.Control.ScaleLine());

}

function cargarTabla() {
	var wfs = new OpenLayers.Protocol.WFS({
		url : "http://localhost:8080/geoserver/wfs",
		featureType : "zonascrecimiento",
		featureNS : "http://www.openplans.org/topp",
		geometryName : "geom"
	});

	wfs
			.read({
				callback : function(response) {
					if (response.features.length > 0) {
						console.log(response.features[0].data);
						var lista = [];
						var listaFinal = new Array();
						for (var int = 0; int < response.features.length; int++) {
							var obj = {
								nombre : response.features[int].data.nombre,
								grado_interes : response.features[int].data.grado_interes
							};
							// var data = response.features[int].data;
							listaFinal.push(obj);
						}

						jQuery('#tablaZonas').html(
								'<table id="table1" class="table"></table>');

						jQuery('#table1')
								.dataTable(
										{
											data : listaFinal,
											order : [ [ 1, "desc" ] ],
											language : {
												"lengthMenu" : "Mostrar _MENU_ registros por pagina",
												"zeroRecords" : "No se encontro nada - sorry",
												"info" : "Mostrando pagina _PAGE_ de _PAGES_",
												"infoEmpty" : "No hay registros disponibles",
												"infoFiltered" : "(filtrado a partir de un total de _MAX_ registros)",
												"search" : "Buscar zona "
											},
											columns : [ {
												data : 'nombre'
											}, {
												data : 'grado_interes'
											} ]
										});
						// document.getElementById("zonasGuardadas").value =
						// response.features;
						// document.getElementById("table1").value =
						// response.features;
					} else {
						console.log('Whoops, no features returned!');
					}
				}
			});

	/*
	 * var yourFilter = new OpenLayers.Filter.Comparison({ type:
	 * OpenLayers.Filter.Comparison.EQUAL_TO, property: yourPropertyName, value:
	 * yourPropertyValue });
	 * 
	 * protocol.read({ flter: yourFilter, callback: yourCallback });
	 */

}
