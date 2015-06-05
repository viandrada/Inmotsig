var QueryString;
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

	// alert(propiedad);
	mapa.addLayer(osm);
	mapa.addLayer(propiedad);

	var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform
	// from WGS
	// 1984
	var toProjection = new OpenLayers.Projection("EPSG:900913"); // to
	// Spherical
	// Mercator
	// Projection
	var position = new OpenLayers.LonLat(-56.21, -34.81).transform(
			fromProjection, toProjection);

	mapa.zoomToMaxExtent();
	mapa.setCenter(position, 12);

	mapa.addControl(new OpenLayers.Control.MousePosition({
		numDigits : 6
	}));
	mapa.addControl(new OpenLayers.Control.ScaleLine());
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
