import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoGuard } from './guard/autenticacao.guard';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren:() => import('./pages/home/home.module').then((h) => h.HomeModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'receitas',
    loadChildren:() => import('./pages/lista-receitas/lista-receitas.module').then((l) => l.ListaReceitasModule),
    canLoad: [AutenticacaoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
