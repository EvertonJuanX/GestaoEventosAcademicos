package br.edu.ifpe.gestaoacademica.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import br.edu.ifpe.gestaoacademica.controllers.dto.BancoDTO;
import br.edu.ifpe.gestaoacademica.entities.Banco;
import br.edu.ifpe.gestaoacademica.repository.BancoRepository;
import jakarta.persistence.EntityNotFoundException;

@CrossOrigin(origins = "*")

@Service
public class BancoService {

	@Autowired
	private BancoRepository bancoRepository;

	public Banco cadastrarBanco(BancoDTO dadosBancoDTO) {

		Banco banco = new Banco();
		banco.setNomeBanco(dadosBancoDTO.nomeBanco());
		banco.setNumConta(dadosBancoDTO.numConta());
		banco.setAgencia(dadosBancoDTO.agencia());
		banco.setOperacao(dadosBancoDTO.operacao());
		banco.setAtivo(true);

		return bancoRepository.save(banco);
	}

	public Banco atualizarBanco(BancoDTO dadosBancoDTO) {
		Banco banco = bancoRepository.findById(dadosBancoDTO.id())
				.orElseThrow(() -> new EntityNotFoundException("Banco não encontrado"));

		if (dadosBancoDTO.nomeBanco() != null) banco.setNomeBanco(dadosBancoDTO.nomeBanco());
		if (dadosBancoDTO.numConta() != null) banco.setNumConta(dadosBancoDTO.numConta());
		if (dadosBancoDTO.agencia() != null) banco.setAgencia(dadosBancoDTO.agencia());
		if (dadosBancoDTO.operacao() != null) banco.setOperacao(dadosBancoDTO.operacao());

		return bancoRepository.save(banco);
	}

	public List<Banco> listarBanco() {
		return bancoRepository.findAllByAtivoTrue();
	}

	public void inativarBanco(Long id) {
		Banco banco = bancoRepository.getReferenceById(id);
		banco.inativar();
		bancoRepository.save(banco);
	}

	public void deletarBanco(Long id) {

		bancoRepository.deleteById(id);
	}

}
