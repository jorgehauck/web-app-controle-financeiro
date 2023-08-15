import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaDespesasComponent } from './lista-despesas.component';
import { ListaDespesasRoutingModule } from 'src/app/pages/lista-despesas/lista-despesas-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

@NgModule({
  declarations: [
    ListaDespesasComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    ListaDespesasRoutingModule,
    NgbModule
  ]
})
export class ListaDespesasModule { }
