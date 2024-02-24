import { NgModule } from '@angular/core';
import { ListaReceitasRoutingModule } from './lista-receitas-routing.module';
import { ListaReceitasComponent } from './lista-receitas.component';
import { CabecalhoModule } from 'src/app/components/cabecalho/cabecalho.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ListaReceitasComponent],
  imports: [
    ListaReceitasRoutingModule,
    CabecalhoModule,
    SharedModule
  ]
})
export class ListaReceitasModule { }
