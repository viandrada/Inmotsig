window.onload = function() {
	        //var fid = document.getElementById("fid").value;
			//cargarDatos(fid);
		}
		
function cargarDatos(fidParam) {
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
									if (response.features[int].fid == fidParam) {
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