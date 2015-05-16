package com.inmotsig.entities;

import java.io.Serializable;

import javax.persistence.*;



/**
 * Entity implementation class for Entity: Propiedad
 *
 */
//@Entity
//@Table(name = "propiedad", schema = "public")
public class Propiedad implements Serializable {

	
	private static final long serialVersionUID = 1L;
	private int idpropiedad;
	private Administrador administrador;
	private int padron;
	private int banos;
	private boolean calefaccion;
	private int cocina;
	private String descripcion;
	private String direccion;
	private int dormitorios;
	private int garage;
	private double gastoscomunes;
	private String imagenespath;
	private int nroapartamento;
	private int parrillero;
	private int piscina;
	private double precio;
	private int supconstruida;
	private int supnoconstruida;
	private String tipopropiedad;
	private String tipotransaccion;

	public Propiedad() {
		super();
	}

	//@Id
	//@Column(name = "idpropiedad", unique = true, nullable = false)
	public int getIdpropiedad() {
		return idpropiedad;
	}

	public void setIdpropiedad(int idpropiedad) {
		this.idpropiedad = idpropiedad;
	}

	//@ManyToOne(fetch = FetchType.LAZY)
	//@JoinColumn(name = "idadministrador")
	public Administrador getAdministrador() {
		return administrador;
	}

	public void setAdministrador(Administrador administrador) {
		this.administrador = administrador;
	}

	//@ManyToOne(fetch = FetchType.LAZY)
	//@JoinColumn(name = "padron")
	public int getPadron() {
		return padron;
	}

	public void setPadron(int padron) {
		this.padron = padron;
	}

	//@Column(name = "banos")
	public int getBanos() {
		return banos;
	}

	public void setBanos(int banos) {
		this.banos = banos;
	}

	//@Column(name = "calefaccion")
	public boolean isCalefaccion() {
		return calefaccion;
	}

	public void setCalefaccion(boolean calefaccion) {
		this.calefaccion = calefaccion;
	}

	@Column(name = "cocina")
	public int getCocina() {
		return cocina;
	}

	public void setCocina(int cocinas) {
		this.cocina = cocinas;
	}

	@Column(name = "descripcion")
	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	@Column(name = "direccion")
	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	@Column(name = "dormitorios")
	public int getDormitorios() {
		return dormitorios;
	}

	public void setDormitorios(int dormitorios) {
		this.dormitorios = dormitorios;
	}

	@Column(name = "garage")
	public int getGarage() {
		return garage;
	}

	public void setGarage(int garage) {
		this.garage = garage;
	}

	@Column(name = "gastoscomunes")
	public double getGastoscomunes() {
		return gastoscomunes;
	}

	public void setGastoscomunes(double gastoscomunes) {
		this.gastoscomunes = gastoscomunes;
	}

	@Column(name = "imagenespath")
	public String getImagenespath() {
		return imagenespath;
	}

	public void setImagenespath(String imagenespath) {
		this.imagenespath = imagenespath;
	}

	@Column(name = "nroapartamento")
	public int getNroapartamento() {
		return nroapartamento;
	}

	public void setNroapartamento(int nroapartamento) {
		this.nroapartamento = nroapartamento;
	}

	@Column(name = "parrillero")
	public int getParrillero() {
		return parrillero;
	}

	public void setParrillero(int parrillero) {
		this.parrillero = parrillero;
	}

	@Column(name = "piscina")
	public int getPiscina() {
		return piscina;
	}

	public void setPiscina(int piscina) {
		this.piscina = piscina;
	}

	@Column(name = "precio")
	public double getPrecio() {
		return precio;
	}

	public void setPrecio(double precio) {
		this.precio = precio;
	}

	@Column(name = "supConstruida")
	public int getSupconstruida() {
		return supconstruida;
	}

	public void setSupconstruida(int supconstruida) {
		this.supconstruida = supconstruida;
	}

	@Column(name = "supnoconstruida")
	public int getSupnoconstruida() {
		return supnoconstruida;
	}

	public void setSupnoconstruida(int supnoconstruida) {
		this.supnoconstruida = supnoconstruida;
	}

	@Column(name = "tipopropiedad")
	public String getTipopropiedad() {
		return tipopropiedad;
	}

	public void setTipopropiedad(String tipopropiedad) {
		this.tipopropiedad = tipopropiedad;
	}

	@Column(name = "tipotransaccion")
	public String getTipotransaccion() {
		return tipotransaccion;
	}

	public void setTipotransaccion(String tipotransaccion) {
		this.tipotransaccion = tipotransaccion;
	}
   
	
}
