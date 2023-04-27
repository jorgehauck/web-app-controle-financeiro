import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable, switchMap } from 'rxjs';
import { Page } from 'src/app/core/Page';
import { Despesas } from 'src/app/model/Despesas';

const API = environment.apiBackEndUrl;

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getDespesas(): Observable<Page<Despesas>> {
    return this.httpClient.get<Page<Despesas>>(`${API}/despesas/listar`);
  }

  public atualizarDespesa(id: number, despesa: Despesas): Observable<Page<Despesas>> {
    return this.httpClient.put<Page<Despesas>>(`${API}/despesas/${id}`, despesa)
    .pipe(
      switchMap(() => {
        return this.getDespesas();
      })
    );
  }
}
