import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  public showSuccess(mensagem: string): void {
    this.toastr.success(mensagem);
  }

  public showError(mensagem: string): void {
    this.toastr.error(mensagem);
  }

  public showWarning(mensagem: string): void {
    this.toastr.warning(mensagem);
  }
}
