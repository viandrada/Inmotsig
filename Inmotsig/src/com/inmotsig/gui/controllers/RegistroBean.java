package com.inmotsig.gui.controllers;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.inmotsig.ejb.service.AdministradorBean;
import com.inmotsig.entities.Administrador;

@ManagedBean
@RequestScoped
public class RegistroBean {

	@NotNull(message = "El nombre es requerido.")
	private String nombre;
	@NotNull(message = "El apellido es requerido.")
	private String apellido;
	/*Regex sacada de: http://howtodoinjava.com/2014/11/11/java-regex-validate-email-address/*/
	@NotNull(message = "El email es requerido.")
	@Pattern(regexp="^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", message="Email no válido.")
	private String email;
	@NotNull(message = "El teléfono es requerido.")
	private String telefono;
	@NotNull(message = "Debe ingresar una contraseña.")
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

	public String showResult() {
		return "result";
	}

	public void setAdmin(Administrador admin) {
		this.admin = admin;
	}

	public String registroAdmin() {
		this.admin.setNombre(this.nombre);
		this.admin.setApellido(this.apellido);
		this.admin.setEmail(this.email);
		this.admin.setTelefono(this.telefono);
		
		/*Encriptar password -> http://www.codejava.net/coding/how-to-calculate-md5-and-sha-hash-values-in-java*/
		MessageDigest digest;
		try {
			digest = MessageDigest.getInstance("MD5");
			byte[] hashedBytes = digest.digest((this.password).getBytes());
			
			StringBuffer stringBuffer = new StringBuffer();
	        for (int i = 0; i < hashedBytes.length; i++) {
	            stringBuffer.append(Integer.toString((hashedBytes[i] & 0xff) + 0x100, 16)
	                    .substring(1));
	        }
			String md5Hash = stringBuffer.toString();
			this.admin.setPassword(md5Hash);
			System.out.println("Password encriptado");
			System.out.println(md5Hash);
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        /*Fin de encriptar password*/
        
		//this.admin.setPassword(this.password);

		boolean ok = service.altaAdmin(this.getAdmin());

		if (ok) {
			System.out.println("Alta exitosa");
			return "/secured/indexAdmin.xhtml?faces-redirect=true";
		} else {
			System.out.println("Error. El admin no fue dado de alta.");
			return null;
		}
	}
	
	public boolean isValidEmailAddress(String email) {
        String ePattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
        java.util.regex.Pattern p = java.util.regex.Pattern.compile(ePattern);
        java.util.regex.Matcher m = p.matcher(email);
        return m.matches();
 }

}
