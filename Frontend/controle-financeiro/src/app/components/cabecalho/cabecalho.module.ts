import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho.component';
import { ListaDespesasRoutingModule } from 'src/app/pages/lista-despesas/lista-despesas-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/material.module';


@NgModule({
  declarations: [
    CabecalhoComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    ListaDespesasRoutingModule,
  ],
  exports: [
    CabecalhoComponent
  ]
})
export class CabecalhoModule { }
