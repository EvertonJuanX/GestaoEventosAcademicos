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

import br.edu.ifpe.gestaoacademica.controllers.dto.BancoDTO;
import br.edu.ifpe.gestaoacademica.entities.Banco;
import br.edu.ifpe.gestaoacademica.service.BancoService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/bancos")
@CrossOrigin(origins = "*")
public class BancoController {
	
	@Autowired
	private BancoService bancoService;
	
	@PostMapping
	@Transactional
	public ResponseEntity<Banco> cadastrarBanco(@RequestBody @Valid BancoDTO dadosBancoDTO){
		
		Banco banco = bancoService.cadastrarBanco(dadosBancoDTO);
		return ResponseEntity.ok(banco);
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<BancoDTO> atualizarBanco(@RequestBody @Valid BancoDTO dadosBancoDTO) {
	    var banco = bancoService.atualizarBanco(dadosBancoDTO);
	    return ResponseEntity.ok(new BancoDTO(banco));
	}
	
	@GetMapping
	public List<BancoDTO> listarBanco(){
		return bancoService.listarBanco().stream().map(BancoDTO::new).toList();
	}
	
	@DeleteMapping("/deletar/{id}")
	@Transactional
	public ResponseEntity<Void> deletarBanco(@PathVariable Long id) {
		bancoService.deletarBanco(id);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> inativarBanco(@PathVariable Long id) {
		bancoService.inativarBanco(id);
		return ResponseEntity.noContent().build();
	}
}
