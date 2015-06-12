window.onload = function() {
	init();
}
var map, zonas, controls;
var saveStrategy;
function init() {
	map = new OpenLayers.Map('map');

	var osm = new OpenLayers.Layer.OSM();

	
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

	
	zonas = new OpenLayers.Layer.Vector("Zonas", {
		strategies : [ new OpenLayers.Strategy.BBOX(), saveStrategy ],
		protocol : new OpenLayers.Protocol.WFS({
			url : "http://localhost:8080/geoserver/wfs",
			featureType : "zonascrecimiento",
			featureNS : "http://www.openplans.org/topp",
			geometryName : "geom",
		}),
		styleMap : new OpenLayers.StyleMap(style)
	});

	map.addLayers([ osm, zonas ]);
	map.addControl(new OpenLayers.Control.LayerSwitcher());
	map.addControl(new OpenLayers.Control.MousePosition());

	
	
	if (console && console.log) {
		function report(event) {
			console.log(event.type, event.feature ? event.feature.id
					: event.components);
		}
		zonas.events.on({
			"beforefeaturemodified" : report,
			"featuremodified" : report,
			"afterfeaturemodified" : agregarDatos,
			"vertexmodified" : report,
			"sketchmodified" : report,
			"sketchstarted" : report,
			"sketchcomplete" : agregarDatos,
			"featureselected":function(event) {
				var feature = event.feature;
				feature.popup = new OpenLayers.Popup.FramedCloud("pop",
						feature.geometry.getBounds().getCenterLonLat(), null,
						'<form >Nombre:<br/><input type="text" id="nombreZona2" value="'
								+ feature.attributes.nombre
								+ '" name="nombreZona2" />', null, true);
				map.addPopup(feature.popup);
			},
			"featureunselected":function(event) {
				var feature = event.feature;
				map.removePopup(feature.popup);
				feature.popup.destroy();
				feature.popup = null;
			}
		});
	}
	
	var select = new OpenLayers.Control.SelectFeature(zonas);
	map.addControl(select);
	select.activate();
	
	function agregarDatos(e) {
		f = e.feature;
		f.popup = new OpenLayers.Popup.FramedCloud(
				"pop",
				f.geometry.getBounds().getCenterLonLat(),
				null,
				'<form >Nombre de la zona:<br/><input type="text" id="nombreZona2"  value= "'+f.attributes.nombre+'" name="nombreZona" /></form>',
				null, true);
		map.addPopup(f.popup);

	};
	
	controls = {
		polygon : new OpenLayers.Control.DrawFeature(zonas,
				OpenLayers.Handler.Polygon,{
					handlerOptions : {
						freehand : false,
						multi : true
					}}),
		modify : new OpenLayers.Control.ModifyFeature(zonas)
	};

	for ( var key in controls) {
		map.addControl(controls[key]);
	}
	
	var panel = new OpenLayers.Control.Panel({
		displayClass : "olControlEditingToolbar"
	});
	
	//Boton de guardar
	var save = new OpenLayers.Control.Button({
		displayClass : 'saveButtonControl',
		trigger : function() {
			f.attributes.nombre = document.getElementById("nombreZona2").value;
			f.attributes.grado_interes = 0;
			saveStrategy.save();
			map.removePopup(f.popup);
			f.popup.destroy();
			f.popup = null;
		},
		title : 'Save changes'
	});

	//panel.addControls([ save ]);
	//map.addControl(panel);

	var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform
	// from WGS
	// 1984
	var toProjection = new OpenLayers.Projection("EPSG:900913"); // to
	// Spherical
	// Mercator
	// Projection
	var position = new OpenLayers.LonLat(-56.21, -34.81).transform(
			fromProjection, toProjection);

	map.zoomToMaxExtent();
	map.setCenter(position, 12);
	document.getElementById('noneToggle').checked = true;
}

function update() {
	// reset modification mode
	controls.modify.mode = OpenLayers.Control.ModifyFeature.RESHAPE;
	var rotate = document.getElementById("rotate").checked;
	if (rotate) {
		controls.modify.mode |= OpenLayers.Control.ModifyFeature.ROTATE;
	}
	var resize = document.getElementById("resize").checked;
	if (resize) {
		controls.modify.mode |= OpenLayers.Control.ModifyFeature.RESIZE;
		var keepAspectRatio = document.getElementById("keepAspectRatio").checked;
		if (keepAspectRatio) {
			controls.modify.mode &= ~OpenLayers.Control.ModifyFeature.RESHAPE;
		}
	}
	var drag = document.getElementById("drag").checked;
	if (drag) {
		controls.modify.mode |= OpenLayers.Control.ModifyFeature.DRAG;
	}
	if (rotate || drag) {
		controls.modify.mode &= ~OpenLayers.Control.ModifyFeature.RESHAPE;
	}
	//controls.modify.createVertices = document.getElementById("createVertices").checked;
	//var sides = parseInt(document.getElementById("sides").value);
	//sides = Math.max(3, isNaN(sides) ? 0 : sides);
	//controls.regular.handler.sides = sides;
	//var irregular = document.getElementById("irregular").checked;
	//controls.regular.handler.irregular = irregular;
}

function toggleControl(element) {
	for (key in controls) {
		var control = controls[key];
		if (element.value == key && element.checked) {
			control.activate();
		} else {
			control.deactivate();
		}
	}
}

function save() {
	f.attributes.nombre = document.getElementById("nombreZona2").value;
	f.attributes.grado_interes = 0;
	f.attributes.demanda = "No definida";
	saveStrategy.save();
	
	map.removePopup(f.popup);
	f.popup.destroy();
	f.popup = null;
}


