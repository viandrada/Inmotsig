package com.inmotsig.ejb.service;

import javax.ejb.Remote;

import com.inmotsig.entities.Administrador;

@Remote
public interface AdministradorBeanRemote {
	public boolean loginAdmin(Administrador admin);
}
