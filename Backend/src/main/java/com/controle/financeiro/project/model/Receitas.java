package com.controle.financeiro.project.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tb_receitas")
public class Receitas implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String descricao;
	private Double valor;
	private LocalDate data;
	
	@OneToMany(mappedBy = "receitas", cascade = CascadeType.ALL)
	private Set<Despesas> despesas = new HashSet<>();
	
	@ManyToOne
	private Usuario usuario;
	
	public Receitas() {}

	public Receitas(Long id, String descricao, Double valor, LocalDate data, Set<Despesas> despesas) {
		this.id = id;
		this.descricao = descricao;
		this.valor = valor;
		this.data = data;
		this.despesas = despesas;
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

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public Set<Despesas> getDespesas() {
		return despesas;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
}
