import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  public showSuccess(mensagem: string) {
    this.toastr.success(mensagem);
  }

  public showError(mensagem: string) {
    this.toastr.error(mensagem);
  }
}
