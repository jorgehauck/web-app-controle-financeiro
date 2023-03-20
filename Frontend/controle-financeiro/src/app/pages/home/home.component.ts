import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from './../../services/autenticacao/autenticacao.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario!: Usuario;

  constructor(
    private formBuiler: FormBuilder,
    private toastService: ToastService,
    private authService: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.inicializarUsuario();
  }

  public inicializarUsuario() {
    this.usuario = {email: '', senha: ''};
  }

  public logar() {
    this.authService.autenticar(this.usuario).subscribe(() => {
      this.router.navigate(['receitas']);
    },
    (error) => {
      this.toastService.showError("Usuário ou senha inválidos!");
    })
  }
}
