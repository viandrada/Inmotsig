package com.inmotsig.ejb.service;

import java.util.List;

import javax.ejb.Local;

import com.inmotsig.entities.ZonaCrecimiento;

@Local
public interface ZonaCrecimientoBeanLocal {

	public List<ZonaCrecimiento> getZonasCrecimiento();
}
