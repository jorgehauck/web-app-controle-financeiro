import { Component, OnInit} from '@angular/core';
import { Receitas } from 'src/app/model/Receitas';
import { ReceitasService } from 'src/app/services/receitas/receitas.service';
import { ToastService } from 'src/app/services/toast.service';
import { ModalComponent } from 'src/app/pages/lista-receitas/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-lista-receitas',
  templateUrl: './lista-receitas.component.html',
  styleUrls: ['./lista-receitas.component.css']
})
export class ListaReceitasComponent implements OnInit {

  receitas!: Array<Receitas>;

  public readonly displayedColumns: string[] = ['descricao', 'valor', 'data', 'acoes'];

  loadingReceitas: boolean = true;

  constructor(
    private receitasService: ReceitasService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getReceitas();
  }

  private getReceitas(): void {
    this.receitasService.getReceitas().subscribe(page => {
        this.receitas = page.content;
    },
    (error) => {
      this.toastService.showWarning("Erro ao exibir receitas! "+ error.error.message);
    });
  }

  public editReceita(item: Receitas): void {
    console.log("ITEM: ", item);

     const dialogRef = this.dialog.open(ModalComponent, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: item
     });

     dialogRef.afterClosed().subscribe(result => {
        if(result) {
          // this.getReceitas();
        }
     });
  }

  // public abrirModalDelecao(item: Receitas): void {
  //   const modalRef = this.modalService.open(ModalConfirmacaoComponent);
  //   modalRef.componentInstance.name = "";
  // }

  public addReceita(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.getReceitas();
    });
  }
}
