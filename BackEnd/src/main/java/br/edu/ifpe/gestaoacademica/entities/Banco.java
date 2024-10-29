package br.edu.ifpe.gestaoacademica.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "Banco")
@Entity(name = "bancos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Banco {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String numConta;
	private String agencia;
	private String operacao;
	private boolean ativo;
	
	
	public void inativar() {
		this.ativo = false;
	}
	
	@OneToMany(mappedBy = "bancos")
	private List<Usuario> usuarios;

}
