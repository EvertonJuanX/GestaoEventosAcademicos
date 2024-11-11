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

import br.edu.ifpe.gestaoacademica.controllers.dto.CertificadoDTO;
import br.edu.ifpe.gestaoacademica.entities.Certificado;
import br.edu.ifpe.gestaoacademica.service.CertificadoService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/certificados")
@CrossOrigin(origins = "*")
public class CertificadoController {
	
	@Autowired
	private CertificadoService certificadoService;
	
	@PostMapping
	@Transactional
	public ResponseEntity<Certificado> cadastrarCertificado(@RequestBody @Valid CertificadoDTO dadosCertificadoDTO) {

		Certificado certificado = certificadoService.cadastrarCertificado(dadosCertificadoDTO);
		return ResponseEntity.ok(certificado);
	}

	@GetMapping
	public List<CertificadoDTO> listarCertificado() {
		return certificadoService.listarCertificados().stream().map(CertificadoDTO::new).toList();
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<Certificado> atualizarCertificado(@RequestBody @Valid CertificadoDTO dadosCertificadoDTO) {
		var certificado = certificadoService.atualizarCertificado(dadosCertificadoDTO);
		return ResponseEntity.ok(certificado);
	}

	@DeleteMapping("/deletar/{id}")
	@Transactional
	public ResponseEntity<Void> deletarCertificado(@PathVariable Long id) {
		certificadoService.deletarCertificado(id);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> inativarCertificado(@PathVariable Long id) {
		certificadoService.inativarCertificado(id);
		return ResponseEntity.noContent().build();
	}
}
