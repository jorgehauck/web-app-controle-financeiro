import { Component, OnInit } from '@angular/core';
import { Receitas } from 'src/app/model/Receitas';
import { ReceitasService } from 'src/app/services/receitas/receitas.service';
import { ToastService } from 'src/app/services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/pages/lista-receitas/modal/modal.component';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/autenticacao/usuario/usuario.service';



@Component({
  selector: 'app-lista-receitas',
  templateUrl: './lista-receitas.component.html',
  styleUrls: ['./lista-receitas.component.css']
})
export class ListaReceitasComponent implements OnInit {

  receitas!: Array<Receitas>;

  constructor(
    private receitasService: ReceitasService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getReceitas();
  }

  private getReceitas(): void {
    this.receitasService.getReceitas().subscribe(page => {
      this.receitas = page.content;
    },
    (error) => {
      this.errorMessage(error.status);
    });
  }

  public abrirModalEdicao(item: Receitas): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.isForReceitas = true;
    modalRef.componentInstance.item = item;
  }

  public abrirModalDelecao(item: Receitas): void {
    const modalRef = this.modalService.open(ModalConfirmacaoComponent);
    modalRef.componentInstance.name = "";
  }

  public adicionarNovaReceita(): void {
    const modalRef = this.modalService.open(ModalComponent);
  }

  private errorMessage(errorStatus: any): void {
    if(errorStatus === 500) {
      this.toastService.showWarning("Sua sessão expirou, por favor entre novamente!");
      this.router.navigate(['']);
      this.usuarioService.logout();
      return;
    }
    if(errorStatus === 404) {
      this.toastService.showWarning("Não existem receitas cadastradas!");
      return;
    }
  }
}
