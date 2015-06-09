window.onload = function() {
	cargarTabla();
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
								estado : estado
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