package com.inmotsig.entities;

import java.io.Serializable;

import javax.persistence.*;

/**
 * Entity implementation class for Entity: Administrador
 *
 */

@NamedQueries({

		@NamedQuery(name = "Administrador.loginAdministrador.Email.Pass", query = "SELECT u "
				+ "FROM Administrador u "
				+ "WHERE u.email = :email and u.password = :pass"),

		@NamedQuery(name = "Administrador.buscarAdministrador.Email", query = "SELECT u "
				+ "FROM Administrador u " + "WHERE u.email = :email"),
				
		@NamedQuery(name = "Administrador.findAllAdministradores", query = "SELECT u "
						+ "FROM Administrador u ")	
})
@Entity
@Table(name = "administrador", schema = "public")
public class Administrador implements Serializable {

	private static final long serialVersionUID = 1L;

	private int idadministrador;
	private String apellido;
	private String email;
	private String nombre;
	private String password;
	private String telefono;

	// private Set<Propiedad> propiedads = new HashSet<Propiedad>(0);

	public Administrador() {
		super();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getIdadministrador() {
		return idadministrador;
	}

	public void setIdadministrador(int idadministrador) {
		this.idadministrador = idadministrador;
	}

	@Column(name = "apellido")
	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	@Column(name = "email")
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "nombre")
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@Column(name = "password")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "telefono")
	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	
	// @OneToMany(fetch = FetchType.LAZY, mappedBy = "administrador")
	// @ElementCollection(targetClass=Propiedad.class)
	// public Set<Propiedad> getPropiedads() {
	// return this.propiedads;
	// }

	// public void setPropiedads(Set<Propiedad> propiedads) {
	// this.propiedads = propiedads;
	// }

}
