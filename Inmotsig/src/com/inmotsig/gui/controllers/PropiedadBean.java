package com.inmotsig.gui.controllers;

import java.io.IOException;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

@ManagedBean
@ViewScoped
public class PropiedadBean {
	
		private int gid = 1;
		private String adminid = "admin@admin.com"; //en realidad es el mail
  		private String direccion = "Cargando...";
  		private int numapartam = 221;
  	    private int gidpadron = 221; 
  	    private String tipopropiedad = "Apartamento";
  	    private String tipotransaccion = "Venta";
   		private int precio = 50000;
   		private String dormitorios = "3";
   		private boolean garage;
   		private int tamanio = 100;
   		private String barrio = "West End";
   		private String banos = "1";
   		private boolean calefaccion;
   		private boolean parrillero;
   		private boolean piscina;
   		private String estado = "publica";
   		private String imagen = "";
   		private String descripcion = "Excelente oportunidad";
   		
   	
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

		public boolean isGarage() {
			return garage;
		}
		public void setGarage(boolean garage) {
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

		public boolean isCalefaccion() {
			return calefaccion;
		}
		public void setCalefaccion(boolean calefaccion) {
			this.calefaccion = calefaccion;
		}
		public boolean isParrillero() {
			return parrillero;
		}
		public void setParrillero(boolean parrillero) {
			this.parrillero = parrillero;
		}
		public boolean isPiscina() {
			return piscina;
		}
		public void setPiscina(boolean piscina) {
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
  		
		public String isChecked(boolean checked)
		{
			if(checked == true) return "checked";
			else return "not";
		}
		
		public String cargar()
		{
			//this.gid = Integer.parseInt(gid);
			try {
				FacesContext.getCurrentInstance().getExternalContext().dispatch("detallePropiedad.xhtml");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return "detallePropiedad";
		}
}
