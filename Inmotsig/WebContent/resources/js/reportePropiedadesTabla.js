window.onload = function() {
	cargarTabla();
	// agregarColumna();
}


function cargarTabla() {
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
						for (var int = 0; int < response.features.length; int++) {
							var estado;
							if (typeof response.features[int].data.estado === 'undefined') {
								estado = "Dato no disponible"
							} else {
								estado = response.features[int].data.estado
							}

							var obj = {
								direccion : response.features[int].data.direccion,
								precio : response.features[int].data.precio,
								estado : estado,
								link : '<button onclick="cargarDatos('
										+ (response.features[int].fid).substring(10,11)
										+ ')" value="'
										+ response.features[int].fid
										+ '">Modificar</button>'
							};
							// var data = response.features[int].data;
							listaFinal.push(obj);
						}

						jQuery('#tablaProps').html(
								'<table id="table1" class="table"></table>');

						jQuery('#table1')
								.dataTable(
										{
											data : listaFinal,
											order : [ [ 0, "asc" ] ],
											language : {
												"lengthMenu" : "Mostrar _MENU_ registros por página",
												"zeroRecords" : "No hay resultados que coincidan con la búsqueda",
												"info" : "Mostrando página _PAGE_ de _PAGES_",
												"infoEmpty" : "No hay registros disponibles",
												"infoFiltered" : "(filtrado a partir de un total de _MAX_ registros)",
												"search" : "Buscar propiedad "
											},
											columns : [ {
												data : 'direccion'
											}, {
												data : 'precio'
											}, {
												data : 'estado'
											}, {
												data : 'link'
											} ]
										});
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

function cargarDatos(fidParam) {
	var fidParam2 = "propiedad."+ fidParam;
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
							if (response.features[int].fid == fidParam2) {
								feauture = response.features[int];
								
								// Cargar datos en vista
								document.getElementById("fid").value = fidParam2;
								
								if (typeof response.features[int].attributes.direccion === "undefined") {
									document.getElementById("direccion").innerHTML = "No hay dirección disponible."
								} else {
									document.getElementById("direccion").innerHTML = response.features[int].attributes.direccion;
								}

								if (typeof response.features[int].attributes.tipooperac === "undefined") {
									document
											.getElementById("detallesPropiedad:operacion").value = "Dato no disponible."
								} else {
									document
											.getElementById("detallesPropiedad:operacion").value = response.features[int].attributes.tipooperac;
								}

								if (typeof response.features[int].attributes.precio === "undefined") {
									document
											.getElementById("detallesPropiedad:precio").value = "Dato no disponible."
								} else {
									document
											.getElementById("detallesPropiedad:precio").value = response.features[int].attributes.precio;
								}

								if (typeof response.features[int].attributes.tipoinmueb === "undefined") {
									document
											.getElementById("detallesPropiedad:tipoPropiedad").value = "Dato no disponible."
								} else {
									document
											.getElementById("detallesPropiedad:tipoPropiedad").value = response.features[int].attributes.tipoinmueb;
								}

								if (typeof response.features[int].attributes.tamano === "undefined") {
									document
											.getElementById("detallesPropiedad:superficieEdificada").value = "Dato no disponible."
								} else {
									document
											.getElementById("detallesPropiedad:superficieEdificada").value = response.features[int].attributes.tamano;
								}

								if (typeof response.features[int].attributes.cantdormit === "undefined") {
									document
											.getElementById("detallesPropiedad:dormitorios").value = "Dato no disponible."
								} else {
									document
											.getElementById("detallesPropiedad:dormitorios").value = response.features[int].attributes.cantdormit;
								}

								if (typeof response.features[int].attributes.banos === "undefined") {
									document
											.getElementById("detallesPropiedad:banos").value = "Dato no disponible."
								} else {
									document
											.getElementById("detallesPropiedad:banos").value = response.features[int].attributes.banos;
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

								if (typeof response.features[int].attributes.descripcio === "undefined") {
									document.getElementById("detallesPropiedad:descripcion").innerHTML = "No hay descripción disponible."
								} else {
									document.getElementById("detallesPropiedad:descripcion").innerHTML = response.features[int].attributes.descripcio;
								}

							}
						}

					} else {
						console.log('Whoops, no features returned!');
					}
				}
			});
}

function save(){
	
}

function agregarColumna() {

	var tbl = document.getElementById('table1'), // table reference
	i;
	// open loop for each row and append cell
	for (i = 0; i < tbl.rows.length; i++) {
		createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), i, 'col');
	}

}

// create DIV element and append to the table cell
function createCell(cell, text, style) {
	var a = document.createElement('a'); // creo el link
	a.href = 'google.com';
	a.innerHTML = "Modificar";
	// a.setAttribute('class', style);
	// a.setAttribute('className', style);
	cell.appendChild(a);
}