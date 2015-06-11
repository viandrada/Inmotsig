var QueryString;
		var comercios, liceos,paradas;
		var feauture = new OpenLayers.Feature();
		var lon, lat, dist;
		var propiedad = new OpenLayers.Layer.Vector();
		var comercios = new OpenLayers.Layer.Vector("SuperMercados", {
			strategies : [ new OpenLayers.Strategy.BBOX() ],
			 style: {
			        externalGraphic: 'http://publicdomainvectors.org/photos/mb-cart-96x96.png', 
			        graphicWidth: 20, 
			        graphicHeight: 20,
			        graphicYOffset: -24
			    },
			protocol : new OpenLayers.Protocol.WFS({
				url : "http://localhost:8080/geoserver/wfs",
				featureType : "comercios",
				featureNS : "http://www.openplans.org/topp",
				geometryName : "geom"
			})
		});
		var liceos = new OpenLayers.Layer.Vector("Liceos", {
			strategies : [ new OpenLayers.Strategy.BBOX() ],
			style: {
		        externalGraphic: 'http://mieinfo.com/wp-content/uploads/2014/08/escola.png', 
		        graphicWidth: 20, 
		        graphicHeight: 20,
		        graphicYOffset: -24
		    },
			protocol : new OpenLayers.Protocol.WFS({
				url : "http://localhost:8080/geoserver/wfs",
				featureType : "secundaria",
				featureNS : "http://www.openplans.org/topp",
				geometryName : "geom",

			}),

		});

		var paradas = new OpenLayers.Layer.Vector("Paradas_Bus", {
			strategies : [ new OpenLayers.Strategy.BBOX() ],
			style: {
		        externalGraphic: 'http://icons.iconarchive.com/icons/iconshock/real-vista-transportation/256/school-bus-icon.png', 
		        graphicWidth: 20, 
		        graphicHeight: 20,
		        graphicYOffset: -24
		    },
			protocol : new OpenLayers.Protocol.WFS({
				url : "http://localhost:8080/geoserver/wfs",
				featureType : "paradas",
				featureNS : "http://www.openplans.org/topp",
				geometryName : "geom",

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
			featureselected : function(event) {
				var featurecomercio = event.feature;
				var geom_1 = new OpenLayers.Geometry.Point(featurecomercio.geometry.x,
						featurecomercio.geometry.y);
				var lonlat = new OpenLayers.LonLat(feauture.geometry.getCentroid().x,
						feauture.geometry.getCentroid().y);
				lonlat.transform(new OpenLayers.Projection('EPSG:4326'),
						new OpenLayers.Projection('EPSG:3857'));
				geom_2 = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
				dist = Math.round(geom_2.distanceTo(geom_1));

				featurecomercio.popup = new OpenLayers.Popup.FramedCloud("pop",
						featurecomercio.geometry.getBounds().getCenterLonLat(), null,
						'Nombre:<br/><input type="text" id="direccion2" value="'
								+ featurecomercio.attributes.nbre + '" name="dir" />'
								+ '<br/>' + '<input type="text" id="dist" value="'
								+ dist + '  metros' + ' " name="dist" />', null, true);
				mapa.addPopup(featurecomercio.popup);

			},

			featureunselected : function(event) {
				var feature2 = event.feature;
				mapa.removePopup(feature2.popup);
				feature2.popup.destroy();
				feature2.popup = null;
			}

		});


		liceos.events.on({
			featureselected : function(event) {
				var featureLiceo = event.feature;
				var geom_1 = new OpenLayers.Geometry.Point(featureLiceo.geometry.x,
						featureLiceo.geometry.y);
				var lonlat = new OpenLayers.LonLat(feauture.geometry.getCentroid().x,
						feauture.geometry.getCentroid().y);
				lonlat.transform(new OpenLayers.Projection('EPSG:4326'),
						new OpenLayers.Projection('EPSG:3857'));
				geom_2 = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
				dist = Math.round(geom_2.distanceTo(geom_1));

				featureLiceo.popup = new OpenLayers.Popup.FramedCloud("pop",
						featureLiceo.geometry.getBounds().getCenterLonLat(), null,
						'Nombre:<br/><input type="text" id="direccion2" value="'
								+ featureLiceo.attributes.nbre + '" name="dir" />'
								+ '<br/>' + '<input type="text" id="dist" value="'
								+ dist + '  metros' + ' " name="dist" />', null, true);
				mapa.addPopup(featureLiceo.popup);

			},

			featureunselected : function(event) {
				var feature2 = event.feature;
				mapa.removePopup(feature2.popup);
				feature2.popup.destroy();
				feature2.popup = null;
			}

		});

		paradas.events.on({
			featureselected : function(event) {
				var featureParadas = event.feature;
				var geom_1 = new OpenLayers.Geometry.Point(featureParadas.geometry.x,
						featureParadas.geometry.y);
				var lonlat = new OpenLayers.LonLat(feauture.geometry.getCentroid().x,
						feauture.geometry.getCentroid().y);
				lonlat.transform(new OpenLayers.Projection('EPSG:4326'),
						new OpenLayers.Projection('EPSG:3857'));
				geom_2 = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
				dist = Math.round(geom_2.distanceTo(geom_1));

				featureParadas.popup = new OpenLayers.Popup.FramedCloud("pop",
						featureParadas.geometry.getBounds().getCenterLonLat(), null,
						'Nombre:<br/><input type="text" id="direccion2" value="'
								+ featureParadas.attributes.nbre + '" name="dir" />'
								+ '<br/>' + '<input type="text" id="dist" value="'
								+ dist + '  metros' + ' " name="dist" />', null, true);
				mapa.addPopup(featureParadas.popup);

			},

			featureunselected : function(event) {
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

			var propiedad = new OpenLayers.Layer.Vector("Propiedad", {
				strategies : [ new OpenLayers.Strategy.BBOX() ],
				 style: {
				        externalGraphic: 'http://publicdomainvectors.org/photos/sweet_home.png', 
				        graphicWidth: 30, 
				        graphicHeight: 30,
				        graphicYOffset: -24
				    },
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

		/*	var prop_Style = new OpenLayers.Style({
				'fillColor' : 'red',
				'fillOpacity' : .8,
				'strokeColor' : 'red',
				'strokeWidth' : 2,
				'pointRadius' : 7
			});
			var propiedad_vector_map = new OpenLayers.StyleMap({
				'default' : prop_Style
			})

			propiedad.styleMap = propiedad_vector_map;
			comercios.styleMap = vector_style_map;
			liceos.styleMap = liceo_style_map;
		*/
			mapa.addLayer(osm);
			mapa.addLayer(comercios);
			mapa.addLayer(liceos)
			mapa.addLayer(paradas);;
			mapa.addLayer(propiedad);

			mapa.addControl(new OpenLayers.Control.ScaleLine());
			mapa.addControl(new OpenLayers.Control.LayerSwitcher(true));
		    mapa.addControl(new OpenLayers.Control.MousePosition({ numDigits: 6 }));

			 
			var selectComercios = new OpenLayers.Control.SelectFeature(
			        [comercios, liceos, paradas],
			        {
			            clickout: true, toggle: false,
			            multiple: false, hover: false,
			            toggleKey: "ctrlKey", // ctrl key removes from selection
			            multipleKey: "shiftKey" // shift key adds to selection
			        }
			    );
			mapa.addControl(selectComercios);
			selectComercios.activate();
		}

		function agregarPuntosInteres() {

			lon = feauture.geometry.getCentroid().x;
			lat = feauture.geometry.getCentroid().y;
			var minx, miny;
			var point = new OpenLayers.LonLat(lon, lat)
			// point.transform(new OpenLayers.Projection('EPSG:3857'), new
			// OpenLayers.Projection('EPSG:4326'));
			minx = point.lon;
			miny = point.lat;
			var sum = 0.00585794448853;

			var bounds_object = new OpenLayers.Bounds(minx + sum, miny + sum, minx
					- sum, miny - sum);

			comercios.filter = new OpenLayers.Filter.Spatial({
				type : OpenLayers.Filter.Spatial.BBOX,
				value : bounds_object, // Bounds(minx, miny, maxx, maxy)
				projection : new OpenLayers.Projection('EPSG:4326')
			});

			liceos.filter = new OpenLayers.Filter.Spatial({
				type : OpenLayers.Filter.Spatial.BBOX,
				value : bounds_object, // Bounds(minx, miny, maxx, maxy)
				projection : new OpenLayers.Projection('EPSG:4326')
			})
			
			paradas.filter = new OpenLayers.Filter.Spatial({
				type : OpenLayers.Filter.Spatial.BBOX,
				value : bounds_object, // Bounds(minx, miny, maxx, maxy)
				projection : new OpenLayers.Projection('EPSG:4326')
			});
		;
			comercios.refresh({
				force : true
			});
			liceos.refresh({
				force : true
			})
			paradas.refresh({
				force : true
			});;
			var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform
			// from WGS
			// 1984
			var toProjection = new OpenLayers.Projection("EPSG:900913"); // to
			// Spherical
			// Mercator
			var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection,
					toProjection);

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
								
								var lista = [];
								var listaFinal = new Array();
								
								for (var int = 0; int < response.features.length; int++) {
									if (response.features[int].data.gidpadron == QueryString.gid) {
										feauture = response.features[int];
										agregarPuntosInteres();
										// Cargar datos en vista
										if (typeof response.features[int].attributes.direccion === "undefined") {
											document.getElementById("direccion").innerHTML = "No hay dirección disponible."
										} else {
											document.getElementById("direccion").innerHTML = response.features[int].attributes.direccion;
										}

										if (typeof response.features[int].attributes.tipooperac === "undefined") {
											document
													.getElementById("detallesPropiedad:operacion").innerHTML = "Dato no disponible."
										} else {
											document
													.getElementById("detallesPropiedad:operacion").innerHTML = response.features[int].attributes.tipooperac;
										}

										if (typeof response.features[int].attributes.precio === "undefined") {
											document
													.getElementById("detallesPropiedad:precio").innerHTML = "Dato no disponible."
										} else {
											document
													.getElementById("detallesPropiedad:precio").innerHTML = response.features[int].attributes.precio;
										}

										if (typeof response.features[int].attributes.tipoinmueb === "undefined") {
											document
													.getElementById("detallesPropiedad:tipoPropiedad").innerHTML = "Dato no disponible."
										} else {
											document
													.getElementById("detallesPropiedad:tipoPropiedad").innerHTML = response.features[int].attributes.tipoinmueb;
										}

										if (typeof response.features[int].attributes.tamano === "undefined") {
											document
													.getElementById("detallesPropiedad:superficieEdificada").innerHTML = "Dato no disponible."
										} else {
											document
													.getElementById("detallesPropiedad:superficieEdificada").innerHTML = response.features[int].attributes.tamano;
										}

										if (typeof response.features[int].attributes.cantdormit === "undefined") {
											document
													.getElementById("detallesPropiedad:dormitorios").innerHTML = "Dato no disponible."
										} else {
											document
													.getElementById("detallesPropiedad:dormitorios").innerHTML = response.features[int].attributes.cantdormit;
										}

										if (typeof response.features[int].attributes.banos === "undefined") {
											document
													.getElementById("detallesPropiedad:banos").innerHTML = "Dato no disponible."
										} else {
											document
													.getElementById("detallesPropiedad:banos").innerHTML = response.features[int].attributes.banos;
										}

										if (typeof response.features[int].attributes.calefaccio === "undefined") {
											document.getElementById("detallesPropiedad:calefaccion").removeAttribute("checked");
										} else {
											if (response.features[int].attributes.calefaccio == "Si") {
												document.getElementById("detallesPropiedad:calefaccion").setAttribute("checked", "checked");
											}
										}

										if (typeof response.features[int].attributes.garage === "undefined") {
											document
													.getElementById("detallesPropiedad:garage").removeAttribute("checked");
										} else {
											if (response.features[int].attributes.garage == "Si") {
												document.getElementById("detallesPropiedad:garage").setAttribute("checked", "checked");
											}
										}

										if (typeof response.features[int].attributes.parillero === "undefined") {
											document
													.getElementById("detallesPropiedad:parrillero").removeAttribute("checked");
										} else {
											if (response.features[int].attributes.parillero == "Si") {
												document.getElementById("detallesPropiedad:parrillero").setAttribute("checked", "checked");
											}
										}

										if (typeof response.features[int].attributes.piscina === "undefined") {
											document
													.getElementById("detallesPropiedad:piscina").removeAttribute("checked");
										} else {
											if (response.features[int].attributes.piscina == "Si") {
												document.getElementById("detallesPropiedad:piscina").setAttribute("checked", "checked");
											}
										}

										if (typeof response.features[int].attributes.adminid === "undefined") {
											document
													.getElementById("contacto:emailAdmin").value = "geogar.tsig@gmail.com"
										} else {
											document
													.getElementById("contacto:emailAdmin").value = response.features[int].attributes.adminid;
										}

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