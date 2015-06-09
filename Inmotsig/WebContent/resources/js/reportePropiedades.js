
    window.onload = function() {
 
			var _class = OpenLayers.Format.XML;
			var originalWriteFunction = _class.prototype.write;
		
			var patchedWriteFunction = function() {
			    var child = originalWriteFunction.apply( this, arguments );
		
			    // NOTE: Remove the rogue namespaces as one block of text.
			    child = child.replace(new RegExp('xmlns:NS\\d+="" NS\\d+:', 'g'), '');
		
			    return child;
			}
		
			_class.prototype.write = patchedWriteFunction;
     // aca termina lo del bug			
			
	
	
	    	
	            mapa = new OpenLayers.Map("mapa");
				var osm  = new OpenLayers.Layer.OSM();	
/*
	 			var wms = new OpenLayers.Layer.WMS("nada",
			    "http://localhost:8080/geoserver/wms", {
				layers : 'tsig_p3:parcelasnuevas',
				transparent: 'false',
				format: 'image/png',
				isBaseLayer: 'true',
				
			});
				*/		
			//var saveStrategy = new OpenLayers.Strategy.Save();
				var styleMap = new OpenLayers.StyleMap({pointRadius: 10,
	                externalGraphic: image});
				
			var propiedadLayer = new OpenLayers.Layer.Vector("WFS", {
				  strategies: [new OpenLayers.Strategy.BBOX()],
				  styleMap: styleMap,
				  protocol: new OpenLayers.Protocol.WFS({
				    url: "http://localhost:8080/geoserver/wfs", 
				    featureType: "propiedad",
				    featureNS: "http://www.openplans.org/topp",
				    geometryName: "geom"
				    
				  })
			}); 
			


			/*
			var panel = new OpenLayers.Control.Panel({
                displayClass: "olControlEditingToolbar"
            });
		    var draw = new OpenLayers.Control.DrawFeature(
		    		wfsTasmaniaRoads, OpenLayers.Handler.Point,
		                {
		                    handlerOptions: {freehand: false, multi: true},
		                    displayClass: "olControlDrawFeaturePoint"
		                    
		                }
		    );
		    
		    draw.events.register('featureadded',draw ,agregarDatos);
		    var formText="sin inicializar";		
		    var f;
		    function agregarDatos(e){
 		    	f=e.feature;
 		    	
 		    	f.popup = new OpenLayers.Popup.FramedCloud
                ("pop",
                f.geometry.getBounds().getCenterLonLat(),
                null,
                                
                '<form >Direccion:<br/><input type="text" id="direccion" name="dir" />'+
                '<br/>Numero de apartamento:<br/><input type="text" id="numAp" name="numApartamento" /> </form>',
                null,
                true 
                );
             mapa.addPopup(f.popup); 

		    };
		  */

				
		            var select = new OpenLayers.Control.SelectFeature(propiedadLayer);
            		mapa.addControl(select);
            		select.activate();
            		
            		function onPopupClose(evt) {
            			selectControl.unselect(selectedFeature);
            	    };
		            
            	    propiedadLayer.events.on({
		            	featureselected: function(event) {
		                    var feature = event.feature;
		                    feature.popup = new OpenLayers.Popup.FramedCloud
		                    ("pop",
		                    feature.geometry.getBounds().getCenterLonLat(),
		                    null,
		                    '<form target="_blank" action="detallePropiedad.xhtml" class="form" >Direccion:<br/><input class="form-control" type="text" id="direccion2" value="'+feature.attributes.direccion+'" name="dir" />'+
		                    '<input type="hidden" id="propGid" value="'+feature.attributes.gidpadron+'" name="gid" />'+
		                    'Numero de apartamento:<input class="form-control" type="text" id="numAp2" value="'+feature.attributes.numapartam+'" name="numApartamento" /> <input class="form-control btn btn-default" type="submit" value="Ver más" ></input></form>',
		                    null,
		                    true 
		                    );
		                 mapa.addPopup(feature.popup);  
		                },

		                //destroy popup when feature is no longer selected. Prevents showing 2 Popups at the same time
		                featureunselected: function(event) {
		                    var feature = event.feature;
		                    mapa.removePopup(feature.popup);
		                    feature.popup.destroy();
		                    feature.popup = null;
		                }
		         
		            });
		            

		       /*var save=  new OpenLayers.Control.Button({displayClass: 'saveButton',
		    	   trigger: function() {
		    	   		alert("guardando");
		    	   		f.attributes.direccion=document.getElementById("direccion").value;
		    	   		f.attributes.numApartamento=parseInt(document.getElementById("numAp").value);
		    	   		f.attributes.adminId="admin";
		    	   		f.attributes.gidPadron=1234;
		    	   		saveStrategy.save()
		    	   		}, title: 'Save changes' 
		    	   	});
		       
		       
		       panel.addControls([select,draw,save]);
		       mapa.addControl(panel);  */
 			
			
			  //mapa.addLayer(wms);			
			 mapa.addLayer(osm);
			var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
		    var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
		    var position       = new OpenLayers.LonLat(-56.21,-34.81).transform( fromProjection, toProjection);
  			  mapa.addLayer(propiedadLayer);
  			  
			  mapa.zoomToMaxExtent();
			  
			  var lonlat = new OpenLayers.LonLat(-56.21,-34.81).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:32721"));
	  	      mapa.setCenter(position,12);
	  	      
			  mapa.addControl(new OpenLayers.Control.LayerSwitcher(true));
			  mapa.addControl(new OpenLayers.Control.MousePosition({ numDigits: 6 }));
			  mapa.addControl(new OpenLayers.Control.ScaleLine());

     
	}

	