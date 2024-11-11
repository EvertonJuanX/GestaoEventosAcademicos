package br.edu.ifpe.gestaoacademica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifpe.gestaoacademica.entities.Transporte;

public interface TransporteRepository extends JpaRepository<Transporte, Long> {
	List<Transporte> findAllByAtivoTrue();
}

