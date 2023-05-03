import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficoResumoMesRoutingModule } from './grafico-resumo-mes-routing.module';
import { GraficoResumoMesComponent } from './grafico-resumo-mes.component';
import { CabecalhoModule } from 'src/app/components/cabecalho/cabecalho.module';


@NgModule({
  declarations: [
    GraficoResumoMesComponent
  ],
  imports: [
    CommonModule,
    GraficoResumoMesRoutingModule,
    CabecalhoModule
  ]
})
export class GraficoResumoMesModule { }
