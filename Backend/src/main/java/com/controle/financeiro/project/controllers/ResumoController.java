package com.controle.financeiro.project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controle.financeiro.project.dto.ResumoMesDTO;
import com.controle.financeiro.project.services.ResumoService;

@RestController
@RequestMapping("resumo")
public class ResumoController {

	@Autowired
	private ResumoService service;
	
	@GetMapping("{ano}/{mes}")
	public ResponseEntity<ResumoMesDTO> getResumoMes(
			@PathVariable("ano") Integer ano, 
			@PathVariable("mes") Integer mes) {
		ResumoMesDTO resumoMesDto = service.resumoMes(ano, mes);
		
		return ResponseEntity.ok(resumoMesDto);
	}
}
