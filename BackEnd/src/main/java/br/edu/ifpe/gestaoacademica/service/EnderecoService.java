package br.edu.ifpe.gestaoacademica.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import br.edu.ifpe.gestaoacademica.controllers.dto.EnderecoDTO;
import br.edu.ifpe.gestaoacademica.entities.Endereco;
import br.edu.ifpe.gestaoacademica.repository.EnderecoRepository;
import jakarta.persistence.EntityNotFoundException;

@CrossOrigin(origins = "*")

@Service
public class EnderecoService {

	@Autowired
	private EnderecoRepository enderecoRepository;

	public Endereco cadastrarEndereco(EnderecoDTO dadosEnderecoDTO) {

		Endereco endereco = new Endereco();
		endereco.setRua(dadosEnderecoDTO.rua());
		endereco.setNumero(dadosEnderecoDTO.numero());
		endereco.setBairro(dadosEnderecoDTO.bairro());
		endereco.setCidade(dadosEnderecoDTO.cidade());
		endereco.setEstado(dadosEnderecoDTO.estado());
		endereco.setCep(dadosEnderecoDTO.cep());
		endereco.setComplemento(dadosEnderecoDTO.complemento());
		endereco.setAtivo(true);

		return enderecoRepository.save(endereco);

	}

	public Endereco atualizarEndereco(EnderecoDTO dadosEnderecoDTO) {
		Endereco endereco = enderecoRepository.findById(dadosEnderecoDTO.id())
				.orElseThrow(() -> new EntityNotFoundException("Endereco não encontrado"));
		
		if (dadosEnderecoDTO.rua() != null) endereco.setRua(dadosEnderecoDTO.rua());
		if (dadosEnderecoDTO.numero() != null) endereco.setNumero(dadosEnderecoDTO.numero());
		if (dadosEnderecoDTO.bairro() != null) endereco.setBairro(dadosEnderecoDTO.bairro());
		if (dadosEnderecoDTO.cidade() != null) endereco.setCidade(dadosEnderecoDTO.cidade());
		if (dadosEnderecoDTO.estado() != null) endereco.setEstado(dadosEnderecoDTO.estado());
		if (dadosEnderecoDTO.cep() != null) endereco.setCep(dadosEnderecoDTO.cep());
		if (dadosEnderecoDTO.complemento() != null) endereco.setComplemento(dadosEnderecoDTO.complemento());

		return enderecoRepository.save(endereco);
	}

	public List<Endereco> listarEnderecos() {
		return enderecoRepository.findAllByAtivoTrue();
	}

	public void inativarEndereco(Long id) {
		Endereco endereco = enderecoRepository.getReferenceById(id);
		endereco.inativar();
		enderecoRepository.save(endereco);
	}

	public void deletarEndereco(Long id) {

		enderecoRepository.deleteById(id);
		;	
	}
}
