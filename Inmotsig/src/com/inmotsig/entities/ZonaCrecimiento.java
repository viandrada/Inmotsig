package com.inmotsig.entities;

public class ZonaCrecimiento {
	
	private String nombre;
	private double gradoInteres;
	
	
	public ZonaCrecimiento()
	{
		this.nombre = "";
		this.gradoInteres = 0d;
	}
	
	public ZonaCrecimiento(String nombre, double gradoInteres) {
		super();
		this.nombre = nombre;
		this.gradoInteres = gradoInteres;
	}
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public double getGradoInteres() {
		return gradoInteres;
	}
	public void setGradoInteres(double gradoInteres) {
		this.gradoInteres = gradoInteres;
	}
	

}
