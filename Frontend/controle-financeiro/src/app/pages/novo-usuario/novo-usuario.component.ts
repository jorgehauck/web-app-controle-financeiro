import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../model/Usuario';
import { NovoUsuarioService } from './../../services/novo-usuario.service';
import { Router } from '@angular/router';
import { ToastService } from './../../services/toast.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  formGroup!: FormGroup;
  usuario!: Usuario;

  constructor(
    private novoUsuarioService: NovoUsuarioService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private router: Router) {

      this.inicializarUsuario();
    }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nomeUsuario: [''],
      email: [''],
      senha: ['']
    });
  }

  private inicializarUsuario() {
    this.usuario = {
      nomeUsuario: '',
      email: '',
      senha: ''
    }
  }

  public cadastrarUsuario() {
    this.usuario.nomeUsuario = this.formGroup.get('nomeUsuario')?.value;
    this.usuario.email = this.formGroup.get('email')?.value;
    this.usuario.senha = this.formGroup.get('senha')?.value;
    console.log("DADOS DO USUÁRIO: ", this.usuario);

    this.novoUsuarioService.cadastrar(this.usuario).subscribe(() => {
      this.router.navigate(['']);
      this.toastService.showSuccess("Usuário cadastrado com sucesso!");
    },
    (error) => {
      this.toastService.showError("Usuário já existe!");
    });
  }


}
