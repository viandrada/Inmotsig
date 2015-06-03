window.onload = function() {
	cargarMapa();
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
	mapa.addLayer(osm);

	var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position       = new OpenLayers.LonLat(-56.21,-34.81).transform( fromProjection, toProjection);
    
	mapa.zoomToMaxExtent();
	mapa.setCenter(position, 12);

	
	mapa.addControl(new OpenLayers.Control.MousePosition({
		numDigits : 6
	}));
	mapa.addControl(new OpenLayers.Control.ScaleLine());
}
