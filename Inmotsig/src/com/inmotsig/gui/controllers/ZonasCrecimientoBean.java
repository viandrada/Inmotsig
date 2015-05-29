package com.inmotsig.gui.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

import com.inmotsig.ejb.service.ZonaCrecimientoBean;
import com.inmotsig.entities.ZonaCrecimiento;

@ManagedBean
@RequestScoped
public class ZonasCrecimientoBean {

	private List<ZonaCrecimiento> zonas;
	@EJB
	ZonaCrecimientoBean service;
	
	
	public ZonasCrecimientoBean() {
		super();
		//this.zonas = service.getZonasCrecimiento();
		//Datos de prueba
        List<ZonaCrecimiento> zonas = new ArrayList<ZonaCrecimiento>();
    	
    	ZonaCrecimiento zona = new ZonaCrecimiento();
    	zona.setGradoInteres(2.2);
    	zona.setNombre("Buceo");
    	
    	ZonaCrecimiento zona2 = new ZonaCrecimiento();
    	zona2.setGradoInteres(5.2);
    	zona2.setNombre("Carrasco");
    	
    	zonas.add(zona);
    	zonas.add(zona2);
    	
		this.zonas = zonas;
	}

	public List<ZonaCrecimiento> getZonas() {
		return zonas;
	}

	public void setZonas(List<ZonaCrecimiento> zonas) {
		this.zonas = zonas;
	}
	
}
