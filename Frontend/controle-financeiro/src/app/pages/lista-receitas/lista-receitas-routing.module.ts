import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaReceitasComponent } from './lista-receitas.component';

const routes: Routes = [
  {
    path: '',
    component: ListaReceitasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaReceitasRoutingModule { }
