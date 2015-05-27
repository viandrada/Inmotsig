package com.inmotsig.gui.controllers;


import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;

@ManagedBean
@ViewScoped
public class NavigationBean {
	
	
	public NavigationBean() {
		super();
		//this.redirectTo = "registroAdmin.xhtml";
		this.renderContent = "";
	}


	private String redirectTo;
	private String renderContent;
	
	public String getRedirectTo() {
		return redirectTo;
	}


	public void setRedirectTo(String redirectTo) {
		this.redirectTo = redirectTo;
	}


	public String getRenderContent() {
		return renderContent;
	}


	public void setRenderContent(String renderContent) {
		this.renderContent = renderContent;
	}


	public String goRegistroAdmin(String redirectTo){
		this.redirectTo = redirectTo;
		return "indexAdmin.xhtml";
	}

}
