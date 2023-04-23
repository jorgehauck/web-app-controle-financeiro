import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ListaDespesasRoutingModule } from 'src/app/pages/lista-despesas/lista-despesas-routing.module';


@NgModule({
  declarations: [
    CabecalhoComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    ListaDespesasRoutingModule
  ],
  exports: [
    CabecalhoComponent
  ]
})
export class CabecalhoModule { }
