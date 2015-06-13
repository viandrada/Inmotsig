package com.inmotsig.gui.controllers;

import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import com.inmotsig.ejb.service.AdministradorBean;
import com.inmotsig.entities.Administrador;

@ManagedBean
@SessionScoped
public class LoginBean {
	
	

	public LoginBean() {
		this.admin = new Administrador();
		this.shownLogin = true;
	}

	private Administrador admin;
	 
	@EJB
	private AdministradorBean service;
    private String email;
    private String password;
    private String redirect;
    private boolean shownLogin;
    private boolean logueado;
    
 
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
 
	
	public boolean isShownLogin() {
		return shownLogin;
	}

	public void setShownLogin(boolean shownLogin) {
		this.shownLogin = shownLogin;
	}
	
	

	public boolean isLogueado() {
		return logueado;
	}

	public void setLogueado(boolean logueado) {
		this.logueado = logueado;
	}

	public String login() {
		this.admin.setEmail(this.email);
		this.admin.setPassword(this.password);
		boolean ok = service.loginAdmin(this.getAdministrador());
		if(ok){
			this.redirect = "Login OK!";
		    this.shownLogin = false;
		    this.logueado = true;
		    return "success";
		}
		else{System.out.println("Todo mal");
		return "error";}
	}
	
	 public String logout() {
	        FacesContext.getCurrentInstance().getExternalContext().invalidateSession();
	        this.shownLogin = true;
	        return "/index.xhtml?faces-redirect=true";
	    }
}
