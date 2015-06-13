window.onload = function() {
	cargarTabla();
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
							var demanda = response.features[int].data.demanda;
							if(typeof demanda === "undefined"){demanda = "No definida"}
							else{demanda = response.features[int].data.demanda;}
							var obj = {
								nombre : response.features[int].data.nombre,
								grado_interes : response.features[int].data.grado_interes,
								demanda: demanda
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
											}, {
												data : 'demanda'
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
