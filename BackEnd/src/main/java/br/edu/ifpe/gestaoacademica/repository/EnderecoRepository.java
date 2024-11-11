package br.edu.ifpe.gestaoacademica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifpe.gestaoacademica.entities.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Long>{
	List<Endereco> findAllByAtivoTrue();
}
