import { Component, OnInit, ViewChild } from '@angular/core';
import { Receitas } from 'src/app/model/Receitas';
import { ReceitasService } from 'src/app/services/receitas/receitas.service';
import { ToastService } from 'src/app/services/toast.service';
import { ModalComponent } from 'src/app/pages/lista-receitas/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-receitas',
  templateUrl: './lista-receitas.component.html',
  styleUrls: ['./lista-receitas.component.css'],
})
export class ListaReceitasComponent implements OnInit {
  public receitas!: Array<Receitas>;

  public displayedColumns: string[] = ['descricao', 'valor', 'data', 'acoes'];
  public dataSource = new MatTableDataSource<Receitas>();

  @ViewChild('paginator') paginator!: MatPaginator;

  loadingReceitas: boolean = true;

  constructor(
    private receitasService: ReceitasService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getReceitas();
  }

  public filterReceitas($event: any) {
    const receita = $event.target.value;
    this.dataSource.filter = receita;
  }

  public getReceitas(): void {
    this.receitasService.getReceitas().subscribe((page) => {
        console.log('DADOS DO SERVIÇO: ', page);
        this.receitas = page.content;
        this.dataSource.data = this.receitas;
        this.dataSource.paginator = this.paginator;
        console.log("DATA SOURCE.DATA: ", this.dataSource.data);
        this.paginator.length = page.totalElements;
      },
      (error) => {
        this.toastService.showWarning('Erro ao exibir receitas! ' + error.error.message);
      });
  }

  public editReceita(item: Receitas): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { title: 'Editar Receita', item: item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getReceitas();
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
      exitAnimationDuration: '1000ms',
      data: { title: 'Adicionar Receita' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getReceitas();
    });
  }
}
