import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { Receitas } from 'src/app/model/Receitas';
import { Page } from 'src/app/core/Page';
import { ToastService } from '../toast.service';

const API = environment.apiBackEndUrl;

@Injectable({
  providedIn: 'root',
})
export class ReceitasService {
  constructor(
    private httpClient: HttpClient,
    private toastService: ToastService
  ) {}

  public getReceitas(): Observable<Page<Receitas>> {
    return this.httpClient.get<Page<Receitas>>(`${API}/receitas/listar`)
    .pipe(
      catchError((error) => {
        if(error.status === 404) {
          this.toastService.showWarning("Não existem recetias cadastradas!");
        }

        const lista: Page<Receitas> = {
          content: [],
          pageable: {
            sort: {
              empty: false,
              sorted: false,
              unsorted: false,
            },
            offset: 0,
            pageNumber: 0,
            pageSize: 0,
            paged: false,
            unpaged: false,
          },
          totalElements: 0,
          totalPages: 0,
          last: false,
          size: 0,
          number: 0,
          sort: {
            empty: false,
            sorted: false,
            unsorted: false,
          },
          numberOfElements: 0,
          first: false,
          empty: false,
        };
        return of(lista);
      })
    );
  }

  public cadastrarReceitas(receita: Receitas): Observable<Page<Receitas>> {
    return this.httpClient.post<Receitas>(`${API}/receitas`, receita).pipe(
      switchMap(() => {
        return this.getReceitas();
      })
    );
  }

  public atualizarReceita(
    id: number,
    receita: Receitas
  ): Observable<Page<Receitas>> {
    return this.httpClient.put<Receitas>(`${API}/receitas/${id}`, receita).pipe(
      switchMap(() => {
        return this.getReceitas();
      })
    );
  }

  public deletarReceita(id: number): Observable<Page<Receitas>> {
    return this.httpClient.delete<Receitas>(`${API}/receitas/${id}`).pipe(
      switchMap(() => {
        return this.getReceitas();
      })
    );
  }
}
