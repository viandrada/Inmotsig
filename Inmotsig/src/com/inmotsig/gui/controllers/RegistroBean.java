package com.inmotsig.gui.controllers;

import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

import com.inmotsig.ejb.service.AdministradorBean;
import com.inmotsig.entities.Administrador;

@ManagedBean
@SessionScoped
public class RegistroBean {

	private String nombre;
	private String apellido;
	private String email;
	private String telefono;
	private String password;
	
	private Administrador admin;
	@EJB
	AdministradorBean service;
	
	public RegistroBean() {
		this.admin = new Administrador();
		this.service = new AdministradorBean();
	}
	
	
	public RegistroBean(String nombre, String apellido, String email,
			String telefono, String password) {
		super();
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
		this.telefono = telefono;
		this.password = password;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellido() {
		return apellido;
	}
	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTelefono() {
		return telefono;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
	public Administrador getAdmin() {
		return admin;
	}


	 public String showResult(){
	      return "result";
	 }
	 
	public void setAdmin(Administrador admin) {
		this.admin = admin;
	}


	public void registroAdmin() {
		this.admin.setNombre(this.nombre);
		this.admin.setApellido(this.apellido);
		this.admin.setEmail(this.email);
		this.admin.setTelefono(this.telefono);
		this.admin.setPassword(this.password);
		boolean ok = service.altaAdmin(this.getAdmin());
		if(ok){System.out.println("Alta exitosa");}
		else{System.out.println("Error. El admin no fue dado de alta.");}
	}
	
}
