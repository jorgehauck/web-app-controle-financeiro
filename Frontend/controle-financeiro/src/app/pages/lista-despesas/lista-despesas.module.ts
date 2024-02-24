import { NgModule } from '@angular/core';
import { ListaDespesasComponent } from './lista-despesas.component';
import { ListaDespesasRoutingModule } from 'src/app/pages/lista-despesas/lista-despesas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListaDespesasComponent
  ],
  imports: [
    ListaDespesasRoutingModule,
    SharedModule
  ]
})
export class ListaDespesasModule { }
