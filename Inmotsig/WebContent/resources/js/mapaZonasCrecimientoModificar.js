window.onload = function() {
    "use strict";
    cargarMapa();
};
var zonas;
function cargarMapa() {
    // esto es por un bug en para wfs
    "use strict";
    var _class = OpenLayers.Format.XML;
    var originalWriteFunction = _class.prototype.write;

    var patchedWriteFunction = function() {
        var child = originalWriteFunction.apply(this, arguments);

        // NOTE: Remove the rogue namespaces as one block of text.
        child = child.replace(new RegExp('xmlns:NS\\d+="" NS\\d+:', 'g'), '');

        return child;
        };

    _class.prototype.write = patchedWriteFunction;
    // aca termina lo del bug

    var saveStrategy;
    saveStrategy = new OpenLayers.Strategy.Save({
        auto : true
        });

    zonas = new OpenLayers.Layer.Vector("WFS", {
        strategies : [ new OpenLayers.Strategy.BBOX(), saveStrategy ],
            protocol : new OpenLayers.Protocol.WFS({
            url : "http://localhost:8080/geoserver/wfs",
            featureType : "zonascrecimiento",
            featureNS : "http://www.openplans.org/topp",
            geometryName : "geom",
            })
    });

    var mapa = new OpenLayers.Map("mapa");

    var osm = new OpenLayers.Layer.OSM();

    var select = new OpenLayers.Control.SelectFeature(zonas);
    mapa.addControl(select);
    select.activate();

    /*Link en donde explica como hacer el commit al delete:
     * http://workshops.boundlessgeo.com/geoext/_sources/wfs/wfst.txt*/
    zonas.events.on({
        featureselected : function(event) {
            var feature = event.feature;
            /*
             * feature.popup = new OpenLayers.Popup.FramedCloud( "pop",
             * feature.geometry.getBounds().getCenterLonLat(), null, '<form
             * class="form" >Nombre:<br/><input class="form-control"
             * type="text" id="nombreZona" value="'+feature.attributes.nombre+'"
             * name="nombreZona" />'+ '<input class="form-control btn
             * btn-default" type="button" value="Eliminar" ></input></form>',
             * null, true); mapa.addPopup(feature.popup);
             */

            var txt;
            var r = confirm("Seguro que desea eliminar esta zona?");
            if (r == true) {
                zonas.removeFeatures(feature);
               /* var node = document.getElementById("mapa");
                while (node.hasChildNodes()) {
                    node.removeChild(node.lastChild);
                    }
                cargarMapa();*/
                if (feature.state != OpenLayers.State.INSERT) {
                    feature.state = OpenLayers.State.DELETE;
                    zonas.addFeatures([feature]);
                }
                //saveStrategy.save();
                //zonas.refresh({force: true});
                
                } else {
				txt = "You pressed Cancel!";
			}
		},

		// destroy popup when feature is no longer selected. Prevents
		// showing 2 Popups at the same time
		featureunselected : function(event) {
			var feature = event.feature;
			/*
			 * mapa.removePopup(feature.popup); feature.popup.destroy();
			 * feature.popup = null;
			 */
		}

	});

	function onPopupClose(evt) {
		selectControl.unselect(selectedFeature);
	}
	;

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

	function eliminar(feature) {
		zonas.removeFeatures(feature);
	}
}
