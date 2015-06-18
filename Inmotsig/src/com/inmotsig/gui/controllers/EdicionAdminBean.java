package com.inmotsig.gui.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.bean.ViewScoped;

import com.inmotsig.ejb.service.AdministradorBean;
import com.inmotsig.entities.Administrador;

@ManagedBean
@ViewScoped
public class EdicionAdminBean {
	
	public EdicionAdminBean() {
		this.admins = new ArrayList<Administrador>();
	}
	
	@PostConstruct
    public void init(){
		try {
			this.setAdmins(service.getAdministradores());
		} catch (Exception e) {
			throw e;
		}
    }
	private List<Administrador> admins;
	
	@EJB 
	private AdministradorBean service;

	public List<Administrador> getAdmins() {
		return admins;
	}

	public void setAdmins(List<Administrador> admins) {
		this.admins = admins;
	}
	
}
