import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MensagemModule } from '../mensagem/mensagem.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    ReactiveFormsModule,
    MensagemModule
  ],
})
export class ModalModule { }
