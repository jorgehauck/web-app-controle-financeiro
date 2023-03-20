import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoUsuarioComponent } from '../novo-usuario/novo-usuario.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'novo-usuario',
    component: NovoUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
