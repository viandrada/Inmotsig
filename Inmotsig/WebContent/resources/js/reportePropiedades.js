window.onload = function() {

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

	var style = new OpenLayers.Style(
	{
		graphicWidth : 21,
		graphicHeight : 29,
		graphicYOffset : -28 // shift graphic up 28 pixels
	},
	{
		rules : [ new OpenLayers.Rule({
			// a rule contains an optional filter
			filter : new OpenLayers.Filter.Comparison({
				type : OpenLayers.Filter.Comparison.EQUAL_TO,
				property : "estado", // the "foo" feature attribute
				value : "publica"
			}),
			// if a feature matches the above filter, use this symbolizer
			symbolizer : {
				externalGraphic : imagenPublica
			}
		}), new OpenLayers.Rule({
			filter : new OpenLayers.Filter.Comparison({
				type : OpenLayers.Filter.Comparison.EQUAL_TO,
				property : "estado",
				value : "privada"
			}),
			symbolizer : {
				externalGraphic : imagenPrivada
			}
		}), new OpenLayers.Rule({
			filter : new OpenLayers.Filter.Comparison({
				type : OpenLayers.Filter.Comparison.EQUAL_TO,
				property : "estado",
				value : "reservada"
			}),
			symbolizer : {
				externalGraphic : imagenReservada
			}
		}), new OpenLayers.Rule({
			// apply this rule if no others apply
			elseFilter : true,
			symbolizer : {
				externalGraphic : image
			}
		}) ]
	});

	// var saveStrategy = new OpenLayers.Strategy.Save();
	var styleMap = new OpenLayers.StyleMap({
		pointRadius : 10,
		externalGraphic : image
	});

	var filterPropiedadPrivada = new OpenLayers.Filter.Comparison({/*
																	 * Privada,
																	 * publica o
																	 * reservada
																	 */
		type : OpenLayers.Filter.Comparison.EQUAL_TO,
		property : "estado",
		value : "privada"
	});

	var filterStrategy = new OpenLayers.Strategy.Filter({
		filter : filterPropiedadPrivada
	});

	var propiedadLayer = new OpenLayers.Layer.Vector("WFS", {
		strategies : [ new OpenLayers.Strategy.BBOX() ],
		styleMap : new OpenLayers.StyleMap(style),
		protocol : new OpenLayers.Protocol.WFS({
			url : "http://localhost:8080/geoserver/wfs",
			featureType : "propiedad",
			featureNS : "http://www.openplans.org/topp",
			geometryName : "geom"

		}),
		filter : new OpenLayers.Filter.Logical({
			type : OpenLayers.Filter.Logical.OR,
			filters : [ new OpenLayers.Filter.Comparison({
				type : OpenLayers.Filter.Comparison.EQUAL_TO,
				property : "estado",
				value : "privada"
			}), new OpenLayers.Filter.Comparison({
				type : OpenLayers.Filter.Comparison.EQUAL_TO,
				property : "estado",
				value : "publica"
			}), new OpenLayers.Filter.Comparison({
				type : OpenLayers.Filter.Comparison.EQUAL_TO,
				property : "estado",
				value : "reservada"
			}) ]
		})
	});

	var select = new OpenLayers.Control.SelectFeature(propiedadLayer);
	mapa.addControl(select);
	select.activate();

	function onPopupClose(evt) {
		selectControl.unselect(selectedFeature);
	}
	;

	propiedadLayer.events
			.on({
				featureselected : function(event) {
					var feature = event.feature;
					feature.popup = new OpenLayers.Popup.FramedCloud(
							"pop",
							feature.geometry.getBounds().getCenterLonLat(),
							null,
							'<form target="_blank" action="/Inmotsig/detallePropiedad.xhtml" class="form" >Direccion:<br/><input class="form-control" type="text" id="direccion2" value="'
									+ feature.attributes.direccion
									+ '" name="dir" />'
									+ '<input type="hidden" id="propGid" value="'
									+ feature.fid
									+ '" name="gid" />'
									+ 'Numero de apartamento:<input class="form-control" type="text" id="numAp2" value="'
									+ feature.attributes.numapartam
									+ '" name="numApartamento" /> <input class="form-control btn btn-default" type="submit" value="Ver más" ></input></form>',
							null, true);
					mapa.addPopup(feature.popup);
				},

				// destroy popup when feature is no longer selected. Prevents
				// showing 2 Popups at the same time
				featureunselected : function(event) {
					var feature = event.feature;
					mapa.removePopup(feature.popup);
					feature.popup.destroy();
					feature.popup = null;
				}

			});

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
	mapa.addLayer(propiedadLayer);

	mapa.zoomToMaxExtent();

	var lonlat = new OpenLayers.LonLat(-56.21, -34.81).transform(
			new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection(
					"EPSG:32721"));
	mapa.setCenter(position, 12);

	mapa.addControl(new OpenLayers.Control.LayerSwitcher(true));
	mapa.addControl(new OpenLayers.Control.MousePosition({
		numDigits : 6
	}));
	mapa.addControl(new OpenLayers.Control.ScaleLine());

}
