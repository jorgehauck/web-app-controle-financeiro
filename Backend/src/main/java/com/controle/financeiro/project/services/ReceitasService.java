package com.controle.financeiro.project.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.controle.financeiro.project.dto.ReceitasDTO;
import com.controle.financeiro.project.exceptionhandler.ReceitasDuplicateException;
import com.controle.financeiro.project.exceptionhandler.ReceitasNotFoundException;
import com.controle.financeiro.project.model.Receitas;
import com.controle.financeiro.project.model.Usuario;
import com.controle.financeiro.project.repositories.ReceitasRepository;

@Service
public class ReceitasService {

	@Autowired
	private ReceitasRepository receitasRepository;

	private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

	@Transactional
	public ReceitasDTO cadastrarReceitas(ReceitasDTO receitas, Usuario usuario) {
		LocalDate dataOrigem = LocalDate.parse(receitas.getData(), formatter);
		
		List<Receitas> descricoesReceitas = receitasRepository.getDescricaoAndData(receitas.getDescricao(), dataOrigem);
		
		for(Receitas rec: descricoesReceitas) {
			boolean areEqualMes = verificarMes(receitas.getData(), rec.getData());
			
			if(rec.getDescricao().equalsIgnoreCase(receitas.getDescricao()) && areEqualMes) {
				throw new ReceitasDuplicateException();
			}
		}		
		Receitas rec = receitas.toReceitas();
		rec.setUsuario(usuario);
		receitasRepository.save(rec);
		return new ReceitasDTO(rec);
	}

	public Page<ReceitasDTO> getListaReceitas(Pageable pageable, Usuario usuarioId) {
		Page<Receitas> receitasList = receitasRepository.getReceitas(pageable, usuarioId);
		
		return receitasList.map(x -> new ReceitasDTO(x));
	}

	public Page<ReceitasDTO> getDetalhamentoReceitas(Long id, Usuario usuarioId, Pageable pageable) {
		List<Receitas> receitaList = receitasRepository.getDetalhamentoReceitas(id,usuarioId,pageable);
		
		Page<Receitas> imp = new PageImpl<>(receitaList, pageable, receitaList.size());
		
		if(imp.isEmpty()) {
			throw new ReceitasNotFoundException();
		}
		return imp.map(x -> new ReceitasDTO(x));
	}

	@Transactional
	public ReceitasDTO atualizarReceita(Long id, ReceitasDTO receita) {
		Optional<Receitas> rec = receitasRepository.findById(id);

		if(rec.isPresent()) {
			Receitas receitaUpdate = rec.get();
			receitaUpdate.setDescricao(receita.getDescricao());
			receitaUpdate.setValor(receita.getValor());
			receitaUpdate.setData(LocalDate.parse(receita.getData(), formatter));
			receitasRepository.save(receitaUpdate);
			return new ReceitasDTO(receitaUpdate);
		}
		throw new ReceitasNotFoundException();
	}
	
	public Page<ReceitasDTO> getReceitasDescricao(String descricao, Usuario usuarioId,Pageable pageable) {
		List<Receitas> receitaList = receitasRepository.getDescricaoReceitas(descricao,usuarioId,pageable);
		
		Page<Receitas> imp = new PageImpl<>(receitaList, pageable, receitaList.size());
		
		if(imp.isEmpty()) {
			throw new ReceitasNotFoundException();
		}
		
		return imp.map(x -> new ReceitasDTO(x));
	}
	
	@Transactional
	public void deletarReceita(Long id) {
		Optional<Receitas> receita = receitasRepository.findById(id);
		
		if(receita.isEmpty()) {
			throw new ReceitasNotFoundException();
		}
		receitasRepository.deleteById(id);
	}
	  private boolean verificarMes(String dataOrigem, LocalDate dataDestino) {
		LocalDate data = LocalDate.parse(dataOrigem, formatter);
		
		int mesOrigem = data.getMonthValue();
		int mesDestino = dataDestino.getMonthValue();
		
		if(mesOrigem == mesDestino)
			return true;

		return false;
	}
}
