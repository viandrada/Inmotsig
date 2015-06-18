package com.inmotsig.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.inmotsig.entities.Administrador;

@Remote
public interface AdministradorBeanRemote {
	public boolean loginAdmin(Administrador admin);
	public boolean altaAdmin(Administrador admin);
	public List<Administrador> getAdministradores();
}
