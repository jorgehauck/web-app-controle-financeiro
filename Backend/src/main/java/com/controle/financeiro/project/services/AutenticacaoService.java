package com.controle.financeiro.project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.controle.financeiro.project.model.Usuario;
import com.controle.financeiro.project.repositories.UsuarioRepository;

@Service
public class AutenticacaoService implements UserDetailsService {
	
	@Autowired
	private UsuarioRepository repository;
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return repository.findByEmail(username);
	}
	
	public UserDetails createUser(Usuario usuario) throws UsernameNotFoundException {
		UserDetails user = repository.findByEmail(usuario.getEmail());
		
		if(user == null) {
			Usuario u = new Usuario();
			u.setNomeUsuario(usuario.getNomeUsuario());
			u.setEmail(usuario.getEmail());
			u.setSenha(encoder.encode(usuario.getSenha()));
			repository.save(u);
			return u;
		}
		throw new UsernameNotFoundException("Usuário existente"); 
	}
}
