package com.inmotsig.ejb.service;



import java.util.ArrayList;
import java.util.List;

import com.inmotsig.entities.ZonaCrecimiento;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;

/**
 * Session Bean implementation class ZonaCrecimiento
 */
@Stateless
@LocalBean
public class ZonaCrecimientoBean implements ZonaCrecimientoBeanRemote, ZonaCrecimientoBeanLocal {

    /**
     * Default constructor. 
     */
    public ZonaCrecimientoBean() {
        // TODO Auto-generated constructor stub
    }

    @Override
    public List<ZonaCrecimiento> getZonasCrecimiento(){
    	List<ZonaCrecimiento> zonas = new ArrayList<ZonaCrecimiento>();
    	return zonas;
    }
}
