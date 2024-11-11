package br.edu.ifpe.gestaoacademica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifpe.gestaoacademica.entities.Certificado;

public interface CertificadoRepository extends JpaRepository<Certificado, Long> {
	List<Certificado> findAllByAtivoTrue();
}
