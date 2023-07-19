package com.controle.financeiro.project.dto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.controle.financeiro.project.model.Receitas;


public class ReceitasDTO {

	private Long id;

	@NotBlank(message = "Campo descrição obrigatório!")
	private String descricao;
	
	@NotNull
	private Double valor;
	
	@NotNull
	private String data;
	
	private List<DespesasDTO> despesas = new ArrayList<>();
	
	private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
	
	public ReceitasDTO() {}
	
	
	public ReceitasDTO(Long id, String descricao, Double valor, String data, 
			List<DespesasDTO> despesas) {
		this.id = id;
		this.descricao = descricao;
		this.valor = valor;
		this.data = data;
		this.despesas = despesas;
	}

	public ReceitasDTO(Receitas receitas) {
		this.id = receitas.getId();
		this.descricao = receitas.getDescricao();
		this.valor = receitas.getValor();
		this.data = receitas.getData().format(formatter);
		this.despesas = receitas.getDespesas().stream().map(x -> new DespesasDTO(x)).collect(Collectors.toList());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public List<DespesasDTO> getDespesas() {
		return despesas;
	}
	
	public Receitas toReceitas() {
		Receitas receitas = new Receitas();
		receitas.setDescricao(descricao);
		receitas.setValor(valor);
		receitas.setData(LocalDate.parse(data, formatter));
		return receitas;
	}
}
