import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaDespesasComponent } from './lista-despesas.component';
import { CabecalhoModule } from 'src/app/components/cabecalho/cabecalho.module';
import { ListaDespesasRoutingModule } from 'src/app/pages/lista-despesas/lista-despesas-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ListaDespesasComponent
  ],
  imports: [
    CommonModule,
    CabecalhoModule,
    ListaDespesasRoutingModule,
    NgbModule
  ]
})
export class ListaDespesasModule { }
