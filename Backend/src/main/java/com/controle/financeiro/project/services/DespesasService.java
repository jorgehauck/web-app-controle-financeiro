package com.controle.financeiro.project.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.controle.financeiro.project.dto.DespesasDTO;
import com.controle.financeiro.project.enums.Categoria;
import com.controle.financeiro.project.exceptionhandler.DespesasDuplicateException;
import com.controle.financeiro.project.exceptionhandler.DespesasNotFoundException;
import com.controle.financeiro.project.model.Despesas;
import com.controle.financeiro.project.model.Receitas;
import com.controle.financeiro.project.repositories.IDespesasRepository;
import com.controle.financeiro.project.repositories.IReceitasRepository;

@Service
public class DespesasService {

	@Autowired
	private IReceitasRepository receitasRepository;

	@Autowired
	private IDespesasRepository despesasRepository;

	private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

	@Transactional
	public DespesasDTO createDespesas(DespesasDTO despesas) {
		Receitas receita = receitasRepository.findById(despesas.getReceitaId()).get();

		LocalDate data = LocalDate.parse(despesas.getData(), formatter);

		List<Despesas> dep = despesasRepository.findByDescricao(despesas.getDescricao(), data);

		for (Despesas obj : dep) {
			boolean areEqualMes = verificarDatas(despesas.getData(), obj.getData());

			if (obj.getDescricao().equalsIgnoreCase(despesas.getDescricao()) && areEqualMes) {
				throw new DespesasDuplicateException();
			}
		}

		Despesas despesa = despesas.toDespesas();
		despesa.setReceitas(receita);
		receita.getDespesas().add(despesa);

		if (despesas.getCategoria() == null) {
			despesa.setCategoria(Categoria.OUTRAS);
			receitasRepository.save(receita);
		}
		despesa.setCategoria(despesas.getCategoria());
		receitasRepository.save(receita);
		return new DespesasDTO(despesa);
	}

	public Page<DespesasDTO> getListaDespesas(Pageable pageable) {
		Page<Despesas> despesas = despesasRepository.findAll(pageable);
		Page<DespesasDTO> despesasDto = despesas.map(DespesasDTO::new);
		return despesasDto;
	}

	public DespesasDTO getDetalhamentoDespesas(Long id) {
		Optional<Despesas> despesas = despesasRepository.findById(id);

		if (despesas.isPresent()) {
			return new DespesasDTO(despesas.get());
		}
		throw new DespesasNotFoundException();
	}

	public List<DespesasDTO> getDescricaoDespesas(String descricao) {
		List<Despesas> despesa = despesasRepository.getDescricaoDespesas(descricao);
		List<DespesasDTO> despesaDTO = despesa.stream().map(dep -> new DespesasDTO(dep)).collect(Collectors.toList());

		for (Despesas dep : despesa) {
			if (dep.getDescricao() == null) {
				throw new DespesasNotFoundException();
			}
		}
		return despesaDTO;
	}

	@Transactional
	public DespesasDTO atualizarDespesa(Long id, DespesasDTO despesa) {
		Optional<Despesas> despesas = despesasRepository.findById(id);

		if (despesas.isPresent()) {
			Despesas dep = despesas.get();
			dep.setDescricao(despesa.getDescricao());
			dep.setValor(despesa.getValor());
			dep.setData(LocalDate.parse(despesa.getData(), formatter));
			dep.setCategoria(despesa.getCategoria());
			despesasRepository.save(dep);
			return new DespesasDTO(dep);
		}
		throw new DespesasNotFoundException();
	}

	@Transactional
	public void deletarDespesa(Long id) {
		Optional<Despesas> despesa = despesasRepository.findById(id);

		if (despesa.isEmpty()) {
			throw new DespesasNotFoundException();
		}
		despesasRepository.deleteById(id);
	}

	private  boolean verificarDatas(String dataOrigem, LocalDate dataDestino) {
		LocalDate data = LocalDate.parse(dataOrigem, formatter);
		int mesOrigem = data.getMonthValue();
		int mesDestino = dataDestino.getMonthValue();

		if(mesOrigem == mesDestino)
			return true;
		return false;
	}
}
