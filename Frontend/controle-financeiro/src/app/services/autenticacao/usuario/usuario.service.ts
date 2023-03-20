import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario';
import { TokenService } from './../token.service';

import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) {}

  private decodificaJWT() {
    const token = this.tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;
    this.usuarioSubject.next(usuario);
  }

  public retornaUsuario() {
    return this.usuarioSubject.asObservable();
  }

  public salvarToken(token: string) {
    this.tokenService.salvaToken(token);
    this.decodificaJWT();
  }

  public logout() {
    this.tokenService.excluiToken();
    this.usuarioSubject.next({});
  }

  public estaLogado() {
    return this.tokenService.possuiToken();
  }
}
