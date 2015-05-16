package com.inmotsig.gui.controllers;

import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;

import com.inmotsig.ejb.service.AdministradorBean;
import com.inmotsig.entities.Administrador;

@ManagedBean
public class LoginController {
	
	

	public LoginController() {
		this.admin = new Administrador();
	}

	private Administrador admin;
	 
	@EJB
	private AdministradorBean service;
    private String email;
    private String password;
    private String redirect;
    
 
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	

	public String getRedirect() {
		return redirect;
	}

	public void setRedirect(String redirect) {
		this.redirect = redirect;
	}

	public Administrador getAdministrador() {
		return admin;
	}
 
	public void setAdministrador(Administrador admin) {
		this.admin = admin;
	}
 
	public void login() {
		this.admin.setEmail(this.email);
		this.admin.setPassword(this.password);
		boolean ok = service.loginAdmin(this.getAdministrador());
		if(ok){this.redirect = "Login OK!";}
		else{System.out.println("Todo mal");}
	}
}
