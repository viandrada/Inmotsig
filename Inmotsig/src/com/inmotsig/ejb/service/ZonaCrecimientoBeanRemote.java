package com.inmotsig.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.inmotsig.entities.ZonaCrecimiento;

@Remote
public interface ZonaCrecimientoBeanRemote {

	public List<ZonaCrecimiento> getZonasCrecimiento();
}
