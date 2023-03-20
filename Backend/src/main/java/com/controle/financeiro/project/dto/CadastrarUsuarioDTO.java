package com.controle.financeiro.project.dto;

import com.controle.financeiro.project.model.Usuario;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CadastrarUsuarioDTO {

	@JsonProperty("nome_usuario")
	private String nomeUsuario;
	private String email;
	private String senha;
	
	public CadastrarUsuarioDTO(Usuario usuario) {
		this.nomeUsuario = usuario.getNomeUsuario();
		this.email = usuario.getEmail();
		this.senha = usuario.getSenha();
	}
	
	public Usuario criarUsuario() {
		Usuario user = new Usuario();
		user.setNomeUsuario(nomeUsuario);
		user.setEmail(email);
		user.setSenha(senha);

		return user;
	}
}
