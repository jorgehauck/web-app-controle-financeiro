import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoUsuarioComponent } from '../novo-usuario/novo-usuario.component';
import { MensagemModule } from 'src/app/components/mensagem/mensagem.module';


@NgModule({
  declarations: [HomeComponent, NovoUsuarioComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MensagemModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
