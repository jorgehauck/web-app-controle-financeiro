import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/material.module';
import { ModalDelecaoComponent } from './components/modal-delecao/modal-delecao.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    ModalDelecaoComponent,
    ModalComponent,
  ],
  imports: [AngularMaterialModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ModalDelecaoComponent]
})
export class SharedModule { }
