import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from './usuario/usuario.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from './../../../environments/environment.prod';


const API = environment.apiBackEndUrl;

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  public autenticar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${API}/login`, usuario, { observe: 'response' })
      .pipe(
        tap(res => {
          const authToken = res.body.token;
          if(authToken) {
            const tokenString = authToken.toString();
            this.usuarioService.salvarToken(tokenString);
          }
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

}
