import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/material.module';
import { ModalDelecaoComponent } from './components/modal-delecao/modal-delecao.component';
import { ModalEdicaoComponent } from './components/modal-edicao/modal-edicao.component';

@NgModule({
  declarations: [
    ModalDelecaoComponent,
    ModalEdicaoComponent
  ],
  imports: [AngularMaterialModule],
  exports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ModalDelecaoComponent,
    ModalEdicaoComponent]
})
export class SharedModule { }
