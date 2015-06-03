package com.inmotsig.gui.controllers;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

@ManagedBean
@RequestScoped
public class PropiedadBean {
	
		private int gid;
		private String adminid; //en realidad es el mail
  		private String direccion;
  		private int numapartam;
  	    private int gidpadron; 
  	    private String tipopropiedad;
  	    private String tipotransaccion;
   		private int precio;
   		private String dormitorios;
   		private String garage;
   		private int tamanio;
   		private String barrio;
   		private String banos;
   		private String calefaccion;
   		private String parrillero;
   		private String piscina;
   		private String estado;
   		private String imagen;
   		private String descripcion;

		public String getAdminid() {
			return adminid;
		}
		public void setAdminid(String adminid) {
			this.adminid = adminid;
		}
		public String getDireccion() {
			return direccion;
		}
		public void setDireccion(String direccion) {
			this.direccion = direccion;
		}
		public int getNumapartam() {
			return numapartam;
		}
		public void setNumapartam(int numapartam) {
			this.numapartam = numapartam;
		}
		public String getTipopropiedad() {
			return tipopropiedad;
		}
		public void setTipopropiedad(String tipopropiedad) {
			this.tipopropiedad = tipopropiedad;
		}
		public int getGidpadron() {
			return gidpadron;
		}
		public void setGidpadron(int gidpadron) {
			this.gidpadron = gidpadron;
		}
		public String getTipotransaccion() {
			return tipotransaccion;
		}
		public void setTipotransaccion(String tipotransaccion) {
			this.tipotransaccion = tipotransaccion;
		}
		public int getPrecio() {
			return precio;
		}
		public void setPrecio(int precio) {
			this.precio = precio;
		}
		public String getDormitorios() {
			return dormitorios;
		}
		public void setDormitorios(String dormitorios) {
			this.dormitorios = dormitorios;
		}
		public String getGarage() {
			return garage;
		}
		public void setGarage(String garage) {
			this.garage = garage;
		}
		public int getTamanio() {
			return tamanio;
		}
		public void setTamanio(int tamanio) {
			this.tamanio = tamanio;
		}
		public String getBarrio() {
			return barrio;
		}
		public void setBarrio(String barrio) {
			this.barrio = barrio;
		}
		public String getBanos() {
			return banos;
		}
		public void setBanos(String banos) {
			this.banos = banos;
		}
		public String getCalefaccion() {
			return calefaccion;
		}
		public void setCalefaccion(String calefaccion) {
			this.calefaccion = calefaccion;
		}
		public String getParrillero() {
			return parrillero;
		}
		public void setParrillero(String parrillero) {
			this.parrillero = parrillero;
		}
		public String getPiscina() {
			return piscina;
		}
		public void setPiscina(String piscina) {
			this.piscina = piscina;
		}
		public String getEstado() {
			return estado;
		}
		public void setEstado(String estado) {
			this.estado = estado;
		}
		public String getDescripcion() {
			return descripcion;
		}
		public void setDescripcion(String descripcion) {
			this.descripcion = descripcion;
		}
		public int getGid() {
			return gid;
		}
		public void setGid(int gid) {
			this.gid = gid;
		}
		public String getImagen() {
			return imagen;
		}
		public void setImagen(String imagen) {
			this.imagen = imagen;
		}
  		
}
