import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './../model/Usuario';
import { Observable } from 'rxjs';

const API = environment.apiBackEndUrl;

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(private httpClient: HttpClient) { }

  public cadastrar(usuario: Usuario): Observable<any> {
    return this.httpClient.post(`${API}/cadastrar`, usuario);
  }
}
