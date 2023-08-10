import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaReceitasRoutingModule } from './lista-receitas-routing.module';
import { ListaReceitasComponent } from './lista-receitas.component';
import { CabecalhoModule } from 'src/app/components/cabecalho/cabecalho.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'src/app/pages/lista-receitas/modal/modal.module';



@NgModule({
  declarations: [ListaReceitasComponent],
  imports: [
    CommonModule,
    ListaReceitasRoutingModule,
    CabecalhoModule,
    NgbModule,
    ModalModule
  ]
})
export class ListaReceitasModule { }
