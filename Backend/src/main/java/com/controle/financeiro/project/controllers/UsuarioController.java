package com.controle.financeiro.project.controllers;

import java.net.URI;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.controle.financeiro.project.dto.CadastrarUsuarioDTO;
import com.controle.financeiro.project.dto.UsuarioDTO;
import com.controle.financeiro.project.model.Usuario;
import com.controle.financeiro.project.services.AutenticacaoService;

@RestController
@RequestMapping("/cadastrar")
public class UsuarioController {
	
	@Autowired
	private AutenticacaoService autenticacaoService;
	
	@PostMapping
	@Transactional
	public ResponseEntity cadastrarUsuario(@RequestBody @Valid CadastrarUsuarioDTO dados, UriComponentsBuilder uriBuilder) {
		Usuario usuario = dados.criarUsuario();
		
		URI uri = uriBuilder.path("/cadastrar/{id}").buildAndExpand(usuario.getId()).toUri();
		autenticacaoService.createUser(usuario);
		
		return ResponseEntity.created(uri).body(new UsuarioDTO(usuario));
	}
}
