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

import br.edu.ifpe.gestaoacademica.controllers.dto.TransporteDTO;
import br.edu.ifpe.gestaoacademica.entities.Transporte;
import br.edu.ifpe.gestaoacademica.service.TransporteService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/transportes")
@CrossOrigin(origins = "*")
public class TransporteController {
	
	@Autowired
	private TransporteService transporteService;

	@PostMapping
	@Transactional
	public ResponseEntity<Transporte> cadastrarTransporte(@RequestBody @Valid TransporteDTO dadosTransporteDTO) {
		Transporte transporte = transporteService.cadastrarTransporte(dadosTransporteDTO);
		return ResponseEntity.ok(transporte);
	}

	@GetMapping
	public List<TransporteDTO> listarTransporte() {
		return transporteService.listarTransporte().stream().map(TransporteDTO::new).toList();
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<Transporte> atualizarTransporte(@RequestBody @Valid TransporteDTO dadosTransporteDTO) {
		var transporte = transporteService.atualizarTransporte(dadosTransporteDTO);
		return ResponseEntity.ok(transporte);
	}

	@DeleteMapping("/deletar/{id}")
	@Transactional
	public ResponseEntity<Void> deletarTransporte(@PathVariable Long id) {
		transporteService.deletarTransporte(id);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> inativarTransporte(@PathVariable Long id) {
		transporteService.inativarTransporte(id);
		return ResponseEntity.noContent().build();
	}
}
