var QueryString;
var comercios,liceos;
var feauture = new OpenLayers.Feature();
var lon,lat,dist;
var propiedad = new OpenLayers.Layer.Vector();
var comercios =   new OpenLayers.Layer.Vector("WFS", {
	 strategies: [ new OpenLayers.Strategy.BBOX() ],
	  protocol: new OpenLayers.Protocol.WFS({
	    url: "http://localhost:8080/geoserver/wfs", 
	    featureType: "comercios",
	    featureNS: "http://www.openplans.org/topp",
	    geometryName: "geom"
	  })
});
var liceos =   new OpenLayers.Layer.Vector("WFS", {
	 strategies: [ new OpenLayers.Strategy.BBOX() ],
	  protocol: new OpenLayers.Protocol.WFS({
	    url: "http://localhost:8080/geoserver/wfs", 
	    featureType: "secundaria",
	    featureNS: "http://www.openplans.org/topp",
	    geometryName: "geom",
	    
	  }),
	 
}); 
window.onload = function() {

	// Para obtener el gid de la propiedad desde la pagina anterior y cargar el
	// bean
	QueryString = function() {
		// This function is anonymous, is executed immediately and
		// the return value is assigned to QueryString!
		var query_string = {};
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			// If first entry with this name
			if (typeof query_string[pair[0]] === "undefined") {
				query_string[pair[0]] = pair[1];
				// If second entry with this name
			} else if (typeof query_string[pair[0]] === "string") {
				var arr = [ query_string[pair[0]], pair[1] ];
				query_string[pair[0]] = arr;
				// If third or later entry with this name
			} else {
				query_string[pair[0]].push(pair[1]);
			}
		}
		return query_string;
	}();
	cargarDatos();
	cargarMapa();
	// alert(QueryString);
}

comercios.events.on({
	featureselected: function(event) {
        var featurecomercio = event.feature;
        var geom_1 = new OpenLayers.Geometry.Point(featurecomercio.geometry.x,featurecomercio.geometry.y);
        var lonlat = new OpenLayers.LonLat(feauture.geometry.getCentroid().x, feauture.geometry.getCentroid().y);
        lonlat.transform(new OpenLayers.Projection('EPSG:4326'), new OpenLayers.Projection('EPSG:3857'));
        geom_2 = new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat);
        dist = Math.round(geom_2.distanceTo(geom_1));
        
        featurecomercio.popup = new OpenLayers.Popup.FramedCloud
        ("pop",
        featurecomercio.geometry.getBounds().getCenterLonLat(),
        null,
        'Nombre:<br/><input type="text" id="direccion2" value="'+featurecomercio.attributes.nbre+'" name="dir" />'+
        '<br/>' + '<input type="text" id="dist" value="'+ dist + '  metros' + ' " name="dist" />',
        null,
        true 
        );
     mapa.addPopup(featurecomercio.popup);
     
     
    },
   
    featureunselected: function(event) {
        var feature2 = event.feature;
        mapa.removePopup(feature2.popup);
        feature2.popup.destroy();
        feature2.popup = null;
    }

});

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

	mapa = new OpenLayers.Map("mapa");
	var osm = new OpenLayers.Layer.OSM();

	var propiedad = new OpenLayers.Layer.Vector("WFS", {
		strategies : [ new OpenLayers.Strategy.BBOX() ],
		protocol : new OpenLayers.Protocol.WFS({
			url : "http://localhost:8080/geoserver/wfs",
			featureType : "propiedad",
			featureNS : "http://www.openplans.org/topp",
			geometryName : "geom"

		}),
		filter : new OpenLayers.Filter.Comparison({
			type : OpenLayers.Filter.Comparison.EQUAL_TO,
			property : "gidpadron",
			value : QueryString.gid
		}),
	});
     
	var prop_Style = new OpenLayers.Style({
		'fillColor': 'red',
		'fillOpacity': .8,
		'strokeColor': 'red',
		'strokeWidth': 2,
		'pointRadius': 7
		});
	var propiedad_vector_map = new OpenLayers.StyleMap({
		'default': prop_Style
		});
	
	var vector_style = new OpenLayers.Style({
		'fillColor': '#669933',
		'fillOpacity': .8,
		'strokeColor': '#aaee77',
		'strokeWidth': 2,
		'pointRadius': 7
		});
	var vector_style_map = new OpenLayers.StyleMap({
		'default': vector_style
		});
	
	var liceo_style = new OpenLayers.Style({
		'fillColor': 'blue',
		'fillOpacity': .8,
		'strokeColor': 'blue',
		'strokeWidth': 2,
		'pointRadius': 7
		});
	var liceo_style_map = new OpenLayers.StyleMap({
		'default': liceo_style
		});
	
	propiedad.styleMap = propiedad_vector_map;
	comercios.styleMap = vector_style_map;
	liceos.styleMap = liceo_style_map;
	
	mapa.addLayer(osm);
	mapa.addLayer(comercios);
	mapa.addLayer(liceos);
	mapa.addLayer(propiedad);

	mapa.addControl(new OpenLayers.Control.MousePosition({
		numDigits : 6
	}));
	mapa.addControl(new OpenLayers.Control.ScaleLine());
	var select = new OpenLayers.Control.SelectFeature(comercios);
	mapa.addControl(select);
	select.activate();
}

function agergarComercios(){
	
	 lon = feauture.geometry.getCentroid().x;
     lat = feauture.geometry.getCentroid().y;
     var minx, miny;
     var point = new OpenLayers.LonLat(lon, lat)
     //point.transform(new OpenLayers.Projection('EPSG:3857'), new OpenLayers.Projection('EPSG:4326'));
     minx = point.lon;
     miny = point.lat;
     var sum = 0.00585794448853;
     
     var bounds_object = new OpenLayers.Bounds(minx +sum, miny + sum, minx - sum, miny - sum);
     
     comercios.filter =new OpenLayers.Filter.Spatial({
 		type: OpenLayers.Filter.Spatial.BBOX,
		value: bounds_object, // Bounds(minx, miny, maxx, maxy)
		projection: new OpenLayers.Projection('EPSG:4326')
	    });
     
     liceos.filter =new OpenLayers.Filter.Spatial({
  		type: OpenLayers.Filter.Spatial.BBOX,
 		value: bounds_object, // Bounds(minx, miny, maxx, maxy)
 		projection: new OpenLayers.Projection('EPSG:4326')
 	    });
     comercios.refresh({force:true}); 
     liceos.refresh({force:true}); 
     var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform
 	// from WGS
 	// 1984
 	var toProjection = new OpenLayers.Projection("EPSG:900913"); // to
 	// Spherical
 	// Mercator
 	var position = new OpenLayers.LonLat(lon, lat).transform(
			fromProjection, toProjection);

	mapa.zoomToMaxExtent();
	mapa.setCenter(position, 15);
}

function cargarDatos() {
	var wfs = new OpenLayers.Protocol.WFS({
		url : "http://localhost:8080/geoserver/wfs",
		featureType : "propiedad",
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
						console.log(response);
						for (var int = 0; int < response.features.length; int++) {
							if (response.features[int].data.gidpadron == QueryString.gid) {
								feauture = response.features[int];
								agergarComercios();
								// Cargar datos en vista
								if (typeof response.features[int].attributes.direccion === "undefined") {
									document.getElementById("direccion").innerHTML = "No hay dirección disponible."
								} else {
									document.getElementById("direccion").innerHTML = response.features[int].attributes.direccion;
								}

								document
										.getElementById("detallesPropiedad:operacion").innerHTML = response.features[int].attributes.tipooperac;
								document
										.getElementById("detallesPropiedad:precio").innerHTML = response.features[int].attributes.precio;
								document
										.getElementById("detallesPropiedad:tipoPropiedad").innerHTML = response.features[int].attributes.tipoinmueb;
								document
										.getElementById("detallesPropiedad:superficieEdificada").innerHTML = response.features[int].attributes.tamano;
								document
										.getElementById("detallesPropiedad:dormitorios").innerHTML = response.features[int].attributes.cantdormit;
								document
										.getElementById("detallesPropiedad:banos").innerHTML = response.features[int].attributes.banos;
								document.getElementById("calefaccion").value = response.features[int].attributes.calefaccio;
								document.getElementById("garage").value = response.features[int].attributes.garage;
								document
										.getElementById("detallesPropiedad:parrillero").value = response.features[int].attributes.parrillero;
								document
										.getElementById("detallesPropiedad:piscina").value = response.features[int].attributes.piscina;
								document
								.getElementById("contacto:emailAdmin").value = response.features[int].attributes.adminid;

								if (typeof response.features[int].attributes.descripcio === "undefined") {
									document.getElementById("descripcion").innerHTML = "No hay descripción disponible."
								} else {
									document.getElementById("descripcion").innerHTML = response.features[int].attributes.descripcio;
								}

							}
						}

					} else {
						console.log('Whoops, no features returned!');
					}
				}
			});
}
