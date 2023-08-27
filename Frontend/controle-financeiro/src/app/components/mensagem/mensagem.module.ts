import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemComponent } from './mensagem.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/material.module';



@NgModule({
  declarations: [
    MensagemComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule
  ],
  exports: [
    MensagemComponent
  ]
})
export class MensagemModule { }
