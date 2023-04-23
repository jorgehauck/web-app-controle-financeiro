import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDespesasComponent } from './lista-despesas.component';

const routes: Routes = [
  {
    path: '',
    component: ListaDespesasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaDespesasRoutingModule { }
