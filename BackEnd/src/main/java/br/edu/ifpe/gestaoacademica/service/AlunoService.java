package br.edu.ifpe.gestaoacademica.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import br.edu.ifpe.gestaoacademica.controllers.dto.AlunoDTO;
import br.edu.ifpe.gestaoacademica.entities.Aluno;
import br.edu.ifpe.gestaoacademica.repository.AlunoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*")

@Service
public class AlunoService {

	@Autowired
	private AlunoRepository alunoRepository;

	public Aluno cadastrarAluno(AlunoDTO dadosAlunoDTO) {

		Aluno aluno = new Aluno();
		aluno.setMatricula(dadosAlunoDTO.matricula());
		aluno.setNome(dadosAlunoDTO.nome());
		aluno.setCpf(dadosAlunoDTO.cpf());
		aluno.setRg(dadosAlunoDTO.rg());
		aluno.setDataNasc(dadosAlunoDTO.dataNasc());
		aluno.setEmail(dadosAlunoDTO.email());
		aluno.setTelefone(dadosAlunoDTO.telefone());
		aluno.setBanco(dadosAlunoDTO.banco());
		aluno.setEndereco(dadosAlunoDTO.endereco());
		aluno.setAtivo(true);

		return alunoRepository.save(aluno);

	}

	public List<Aluno> listarAlunos() {
		return alunoRepository.findAllByAtivoTrue();
	}

	public Aluno atualizarAluno(@Valid AlunoDTO dadosAlunoDTO) {

		Aluno aluno = alunoRepository.findById(dadosAlunoDTO.id())
				.orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado"));

		if (dadosAlunoDTO.nome() != null) aluno.setNome(dadosAlunoDTO.nome());
		if (dadosAlunoDTO.matricula() != null) aluno.setMatricula(dadosAlunoDTO.matricula());
		if (dadosAlunoDTO.dataNasc() != null) aluno.setDataNasc(dadosAlunoDTO.dataNasc());
		if (dadosAlunoDTO.email() != null) aluno.setEmail(dadosAlunoDTO.email());
		if (dadosAlunoDTO.telefone() != null) aluno.setTelefone(dadosAlunoDTO.telefone());
		if (dadosAlunoDTO.banco() != null) aluno.setBanco(dadosAlunoDTO.banco());
		if (dadosAlunoDTO.endereco() != null) aluno.setEndereco(dadosAlunoDTO.endereco());

		return alunoRepository.save(aluno);
	}

	public void inativarAluno(Long id) {
		Aluno aluno = alunoRepository.getReferenceById(id);
		aluno.inativar();
		alunoRepository.save(aluno);
	}

	public void deletarAluno(Long id) {
		alunoRepository.deleteById(id);
	}
}
