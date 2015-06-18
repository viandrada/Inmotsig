package com.inmotsig.gui.controllers;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;

@ManagedBean
@ViewScoped
public class EdicionPropiedadBean {

	private boolean render = true;

	public boolean isRender() {
		return render;
	}

	public void setRender(boolean render) {
		this.render = render;
	}
	
	
}
