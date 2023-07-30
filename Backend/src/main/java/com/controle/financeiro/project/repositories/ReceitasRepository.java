package com.controle.financeiro.project.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.controle.financeiro.project.model.Receitas;
import com.controle.financeiro.project.model.Usuario;

@Repository
public interface ReceitasRepository extends JpaRepository<Receitas, Long>{

	@Query(value = "SELECT obj FROM Receitas obj")
	List<Receitas> getDescricaoAndData(String descricao, LocalDate data);
	
	@Query(value = "select obj FROM Receitas obj LEFT JOIN FETCH obj.despesas "
			+ "WHERE obj.usuario = :usuarioId",
			countQuery = "SELECT COUNT(*) FROM Receitas obj JOIN obj.despesas")
	Page<Receitas> getReceitas(Pageable pageable, @Param("usuarioId") Usuario usuarioId);
	
	
	@Query(value = "select obj FROM Receitas obj LEFT JOIN FETCH obj.despesas "
			+ "WHERE obj.descricao like %:descricao% "
			+ "AND obj.usuario = :usuarioId")
	List<Receitas> getDescricaoReceitas(
			@Param("descricao") String descricao, 
			@Param("usuarioId") Usuario usuarioId,
			Pageable pageable);
	
	@Query(value = "select obj FROM Receitas obj "
			+ "WHERE YEAR(obj.data) = :ano "
			+ "AND MONTH(obj.data) = :mes "
			+ "AND obj.usuario = :usuarioId")
	List<Receitas> getResumoReceitas(@Param("ano") Integer ano, 
			@Param("mes") Integer mes, 
			@Param("usuarioId") Usuario usuarioId);
	
	@Query(value = "select obj FROM Receitas obj LEFT JOIN FETCH obj.despesas "
			+ "WHERE obj.id = :id "
			+ "AND obj.usuario = :usuarioId")
	List<Receitas> getDetalhamentoReceitas(
			@Param("id") Long id, 
			@Param("usuarioId") Usuario usuarioId, 
			Pageable pageable);
}
