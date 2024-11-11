package br.edu.ifpe.gestaoacademica.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifpe.gestaoacademica.controllers.dto.EnderecoDTO;
import br.edu.ifpe.gestaoacademica.entities.Endereco;
import br.edu.ifpe.gestaoacademica.service.EnderecoService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/enderecos")
@CrossOrigin(origins = "*")
public class EnderecoController {
	
	@Autowired
	private EnderecoService enderecoService;
	
	@PostMapping
	@Transactional
	public ResponseEntity<Endereco> cadastrarEndereco(@RequestBody @Valid EnderecoDTO dadosEnderecoDTO){
		
		Endereco endereco = enderecoService.cadastrarEndereco(dadosEnderecoDTO);
		return ResponseEntity.ok(endereco);	
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<EnderecoDTO> atualizarEndereco(@RequestBody @Valid EnderecoDTO dadosEnderecoDTO) {
	    var endereco = enderecoService.atualizarEndereco(dadosEnderecoDTO);
	    return ResponseEntity.ok(new EnderecoDTO(endereco));
	}
	
	@GetMapping
    public List<EnderecoDTO> listarEndereco(){
		return enderecoService.listarEnderecos().stream().map(EnderecoDTO::new).toList();
	}
	
	@DeleteMapping("/deletar/{id}")
	@Transactional
	public ResponseEntity<Void> deletarEndereco(@PathVariable Long id){
		enderecoService.deletarEndereco(id);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> inativarEndereco(@PathVariable Long id){
		enderecoService.inativarEndereco(id);
		return ResponseEntity.noContent().build();
	}

}
