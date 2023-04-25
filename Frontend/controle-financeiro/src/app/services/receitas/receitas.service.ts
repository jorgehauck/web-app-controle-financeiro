import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable, switchMap } from 'rxjs';
import { Receitas } from 'src/app/model/Receitas';
import { Page } from 'src/app/core/Page';


const API = environment.apiBackEndUrl;

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  constructor(
    private httpClient: HttpClient)
    { }

  public getReceitas(): Observable<Page<Receitas>> {
    return this.httpClient.get<Page<Receitas>>(`${API}/receitas/listar`);
  }

  public atualizarReceita(id: number, receita: Receitas): Observable<Page<Receitas>> {
    return this.httpClient.put<Receitas>(`${API}/${id}`, receita)
    .pipe(
      switchMap(() => {
        return this.getReceitas();
      })
    );
  }
}
