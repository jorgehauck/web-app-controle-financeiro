import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficoResumoMesComponent } from './grafico-resumo-mes.component';

const routes: Routes = [
  {
    path: '',
    component: GraficoResumoMesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficoResumoMesRoutingModule { }
