import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public retornaToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  public salvaToken(token: string) {
    localStorage.setItem(KEY, token);
  }

  public excluiToken() {
    localStorage.removeItem(KEY);
    window.location.reload();
  }

  public possuiToken() {
    return !!this.retornaToken();
  }
}
