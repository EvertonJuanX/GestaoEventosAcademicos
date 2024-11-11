package br.edu.ifpe.gestaoacademica.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import br.edu.ifpe.gestaoacademica.controllers.dto.ServidorDTO;
import br.edu.ifpe.gestaoacademica.entities.Servidor;
import br.edu.ifpe.gestaoacademica.repository.ServidorRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*")

@Service
public class ServidorService {

	@Autowired
	private ServidorRepository servidorRepository;


	public Servidor cadastrarServidor(ServidorDTO dadosServidorDTO) {
		
		Servidor servidor = new Servidor();
		
		servidor.setSiape(dadosServidorDTO.siape());
		servidor.setCargo(dadosServidorDTO.cargo());
		servidor.setNome(dadosServidorDTO.nome());
		servidor.setCpf(dadosServidorDTO.cpf());
		servidor.setRg(dadosServidorDTO.rg());
		servidor.setDataNasc( dadosServidorDTO.dataNasc());
		servidor.setEmail( dadosServidorDTO.email());
		servidor.setTelefone(dadosServidorDTO.telefone());
		servidor.setBanco(dadosServidorDTO.banco());
		servidor.setEndereco(dadosServidorDTO.endereco());
		servidor.setAtivo(true);

		return servidorRepository.save(servidor);

	}

	public List<Servidor> listarServidores() {
		return servidorRepository.findAllByAtivoTrue();
	}

	public Servidor atualizarServidor(@Valid ServidorDTO dadosServidorDTO) {
		
	    Servidor servidor = servidorRepository.findById(dadosServidorDTO.id())
	            .orElseThrow(() -> new EntityNotFoundException("Servidor não encontrado"));

		if (dadosServidorDTO.nome() != null) servidor.setNome(dadosServidorDTO.nome());
		if (dadosServidorDTO.siape() != null) servidor.setSiape(dadosServidorDTO.siape());
		if (dadosServidorDTO.cargo() != null) servidor.setCargo(dadosServidorDTO.cargo());
		if (dadosServidorDTO.dataNasc() != null) servidor.setDataNasc(dadosServidorDTO.dataNasc());
		if (dadosServidorDTO.email() != null) servidor.setEmail(dadosServidorDTO.email());
		if (dadosServidorDTO.telefone() != null) servidor.setTelefone(dadosServidorDTO.telefone());
		if (dadosServidorDTO.banco() != null) servidor.setBanco(dadosServidorDTO.banco());
		if (dadosServidorDTO.endereco() != null) servidor.setEndereco(dadosServidorDTO.endereco());
		
		return servidorRepository.save(servidor);
	}

	public void inativarServidor(Long id) {
		Servidor servidor = servidorRepository.getReferenceById(id);
		servidor.inativar();
		servidorRepository.save(servidor);
	}

	public void deletarServidor(Long id) {
		servidorRepository.deleteById(id);
	}
}
