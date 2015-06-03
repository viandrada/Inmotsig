package com.inmotsig.gui.controllers;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;

@ManagedBean
@ViewScoped
public class EmailBean {

	private String emailAdmin;
	private String nombreUsuario = "Prueba";
	private String telefono;
	private String emailUsuario;
	private String consulta;
	public String getEmailAdmin() {
		return emailAdmin;
	}
	public void setEmailAdmin(String emailAdmin) {
		this.emailAdmin = emailAdmin;
	}
	public String getNombreUsuario() {
		return nombreUsuario;
	}
	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}
	public String getTelefono() {
		return telefono;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	public String getEmailUsuario() {
		return emailUsuario;
	}
	public void setEmailUsuario(String emailUsuario) {
		this.emailUsuario = emailUsuario;
	}
	public String getConsulta() {
		return consulta;
	}
	public void setConsulta(String consulta) {
		this.consulta = consulta;
	}
	
	public void send()
	{
		boolean enviado = false;
		Email email = new SimpleEmail();
		try {
			email.setHostName("smtp.googlemail.com");
			email.setSmtpPort(465);
			email.setAuthenticator(new DefaultAuthenticator("username", "password"));
			email.setSSLOnConnect(true);
			email.setFrom(this.emailUsuario);
			email.setSubject("TestMail");
			email.setMsg(this.consulta);
			email.addTo("victoria.andrada@gmail.com");
			email.send();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	
		//return enviado;
	}
}
