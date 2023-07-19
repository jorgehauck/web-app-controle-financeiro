package com.controle.financeiro.project.dto;

import com.controle.financeiro.project.model.Usuario;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {
	
	@JsonProperty("nome_usuario")
	private String nomeUsuario;
	private String email;

	public UsuarioDTO(Usuario usuario) {
		this.nomeUsuario = usuario.getNomeUsuario();
		this.email = usuario.getEmail();
	}
}
