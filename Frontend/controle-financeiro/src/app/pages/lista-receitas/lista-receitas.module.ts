import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaReceitasRoutingModule } from './lista-receitas-routing.module';
import { ListaReceitasComponent } from './lista-receitas.component';
import { CabecalhoModule } from 'src/app/components/cabecalho/cabecalho.module';


@NgModule({
  declarations: [ListaReceitasComponent],
  imports: [
    CommonModule,
    ListaReceitasRoutingModule,
    CabecalhoModule
  ]
})
export class ListaReceitasModule { }
