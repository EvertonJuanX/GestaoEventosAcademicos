package br.edu.ifpe.gestaoacademica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifpe.gestaoacademica.entities.Banco;

public interface BancoRepository extends JpaRepository<Banco, Long>{
	List<Banco> findAllByAtivoTrue();
}
