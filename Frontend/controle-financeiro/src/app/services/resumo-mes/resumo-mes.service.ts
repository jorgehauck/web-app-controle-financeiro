import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResumoMes } from 'src/app/model/ResumoMes';
import { environment } from 'src/environments/environment.prod';

const API = environment.apiBackEndUrl;

@Injectable({
  providedIn: 'root',
})
export class ResumoMesService {
  constructor(private httpClient: HttpClient) {}

  public getResumoMes(ano: number, mes: number): Observable<ResumoMes> {
    return this.httpClient.get<ResumoMes>(`${API}/resumo/${ano}/${mes}`);
  }
}
