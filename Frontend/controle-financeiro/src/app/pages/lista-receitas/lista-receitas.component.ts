import { Component, OnInit} from '@angular/core';
import { Receitas } from 'src/app/model/Receitas';
import { ReceitasService } from 'src/app/services/receitas/receitas.service';
import { ToastService } from 'src/app/services/toast.service';
import { ModalComponent } from 'src/app/pages/lista-receitas/modal/modal.component';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/autenticacao/usuario/usuario.service';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-lista-receitas',
  templateUrl: './lista-receitas.component.html',
  styleUrls: ['./lista-receitas.component.css']
})
export class ListaReceitasComponent implements OnInit {

  receitas!: Array<Receitas>;

  readonly displayedColumns: string[] = ['descricao', 'valor', 'data', 'acoes'];

  constructor(
    private receitasService: ReceitasService,
    private toastService: ToastService,
    private dialog: MatDialog,
    //private modalService: NgbModal,
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

  public editReceita(item: Receitas): void {
     const dialogRef = this.dialog.open(ModalComponent, {
      width: '40%',
      data: item
     });

     dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.getReceitas();
        }
     });
  }


  // public abrirModalDelecao(item: Receitas): void {
  //   const modalRef = this.modalService.open(ModalConfirmacaoComponent);
  //   modalRef.componentInstance.name = "";
  // }

  // public adicionarNovaReceita(): void {
  //   const modalRef = this.modalService.open(ModalComponent);
  // }

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
