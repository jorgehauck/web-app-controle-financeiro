import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { Page } from 'src/app/core/Page';
import { Despesas } from 'src/app/model/Despesas';
import { ToastService } from '../toast.service';
import { TokenService } from '../autenticacao/token.service';

const API = environment.apiBackEndUrl;

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  constructor(
    private httpClient: HttpClient,
    private toastService: ToastService,
    private tokenService: TokenService
  ) { }

  public getDespesas(): Observable<Page<Despesas>> {
    return this.httpClient.get<Page<Despesas>>(`${API}/despesas/listar`)
    .pipe(
      catchError((error) => {
        if(error.status === 500) {
          this.toastService.showWarning("Sessão expirada, por favor faça o acesso novamente!");
          this.tokenService.excluiToken();
        }
        else {
          this.toastService.showWarning("Não existem despesas cadastradas!");
        }
        const lista: Page<Despesas> = {
          content: []
        };
        return of(lista);
      })
    );
  }

  public cadastrarDespesa(despesa: Despesas): Observable<Page<Despesas>> {
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
