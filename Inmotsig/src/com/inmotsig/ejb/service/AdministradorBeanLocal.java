package com.inmotsig.ejb.service;

import java.util.List;

import javax.ejb.Local;

import com.inmotsig.entities.Administrador;

@Local
public interface AdministradorBeanLocal {
	public boolean loginAdmin(Administrador admin);
	public boolean altaAdmin(Administrador admin);
	public List<Administrador> getAdministradores();
}
