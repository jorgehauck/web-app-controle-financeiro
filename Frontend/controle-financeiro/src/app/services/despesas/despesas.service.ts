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

  public inserirDespesa(despesa: Despesas): Observable<Page<Despesas>> {
    return this.httpClient.post<Despesas>(`${API}/despesas`, despesa)
    .pipe(
      switchMap(() => {
        return this.getDespesas();
      })
    );
  }

  public atualizarDespesa(id: number, despesa: Despesas): Observable<Page<Despesas>> {
    return this.httpClient.put<Despesas>(`${API}/despesas/${id}`, despesa)
    .pipe(
      switchMap(() => {
        return this.getDespesas();
      })
    );
  }

  public deletarDespesa(id: number): Observable<Page<Despesas>> {
    return this.httpClient.delete(`${API}/despesas/${id}`)
    .pipe(
      switchMap(() => {
        return this.getDespesas();
      })
    );
  }
}
