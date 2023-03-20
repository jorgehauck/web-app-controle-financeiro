package com.controle.financeiro.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DadosAutenticacaoDTO {	

	private String nomeUsuario;
	private String email;
	private String senha;
}
