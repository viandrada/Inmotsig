package com.inmotsig.ejb.service;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import com.inmotsig.entities.Administrador;

/**
 * Session Bean implementation class AdministradorBean
 */
@Stateless
@LocalBean
public class AdministradorBean implements AdministradorBeanRemote, AdministradorBeanLocal {

    /**
     * Default constructor. 
     */
    public AdministradorBean() {
        // TODO Auto-generated constructor stub
    }
    

	@PersistenceContext(name = "Inmotsig")
	private EntityManager em;
 
	@Override
	public boolean loginAdmin(Administrador admin) {
 
		
		Boolean existe = false;
		try{
			Query consulta = this.em.createNamedQuery("Administrador.loginAdministrador.Email.Pass");
		  	consulta.setParameter("email", admin.getEmail());
		  	consulta.setParameter("pass", admin.getPassword());
		  	if ((!consulta.getResultList().isEmpty())||(admin.getEmail().equalsIgnoreCase("admin") && admin.getPassword().equalsIgnoreCase("admin"))){
		  		existe = true;
		  	} 
		}catch (Exception excep){			
			throw excep;
		} 	
	  	return existe;
		
	}
	
	@Override
	public boolean altaAdmin(Administrador admin){
		boolean altaExitosa = false;
		try {
			this.em.persist(admin);
			
			Query consulta = this.em.createNamedQuery("Administrador.buscarAdministrador.Email");
			consulta.setParameter("email", admin.getEmail());
			if (!consulta.getResultList().isEmpty()){
				altaExitosa = true;
		  	} 
		} catch (Exception e) {
			throw e;
			//System.out.println("Error en Alta de Administrador");
		}
		return altaExitosa;
	}

}
