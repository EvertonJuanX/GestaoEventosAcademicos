package br.edu.ifpe.gestaoacademica.controllers.dto;

import br.edu.ifpe.gestaoacademica.entities.Transporte;
import jakarta.validation.constraints.NotBlank;

public record TransporteDTO(
		Long id,
		@NotBlank
		String categoria,
		@NotBlank
		String placa,
		@NotBlank
		String quilometragem,
		@NotBlank
		String nomeMotorista,
		@NotBlank
		String horaSaida,
		@NotBlank
		String horaChegada) {
	
	//Construtor para cadastrar transporte
	public TransporteDTO(String categoria, String placa, String quilometragem, String nomeMotorista, 
						 String horaSaida, String horaChegada) {
		this(null, categoria, placa, quilometragem, nomeMotorista, horaSaida, horaChegada);
	}

	//Construtor para listar transporte
	public TransporteDTO(Transporte transporte) {
		this(transporte.getId(), transporte.getCategoria(), transporte.getPlaca(), transporte.getQuilometragem(), 
			transporte.getNomeMotorista(), transporte.getHoraSaida(), transporte.getHoraChegada());
	}
	
	//Construtor para atualizar transporte
	public TransporteDTO(Long id, String categoria, String placa, String quilometragem, String nomeMotorista, 
						 String horaSaida, String horaChegada) {
		this.id = id; 
		this.categoria = categoria;
		this.placa = placa;
		this.quilometragem = quilometragem;
		this.nomeMotorista = nomeMotorista;
		this.horaSaida = horaSaida;
		this.horaChegada = horaChegada;
	}
}
