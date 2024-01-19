import { Component, OnInit, ViewChild } from '@angular/core';
import { Receitas } from 'src/app/model/Receitas';
import { ReceitasService } from 'src/app/services/receitas/receitas.service';
import { ToastService } from 'src/app/services/toast.service';
import { ModalComponent } from 'src/app/pages/lista-receitas/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDelecaoComponent } from 'src/app/shared/components/modal-delecao/modal-delecao.component';

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
        this.receitas = page.content;
        this.dataSource.data = this.receitas;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        } else {
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          }, 100);
        }
        this.paginator.length = page.totalElements;
      },
      (error) => {
        this.toastService.showWarning('Erro ao exibir receitas! ' + error.error.message);
      }
    );
  }

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

  public deleteReceita(item: Receitas): void {
    console.log("ITEM: ", item);
    const dialogRef = this.dialog.open(ModalDelecaoComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: 'Realmente deseja excluir a receita?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.receitasService.deletarReceita(item.id).subscribe(() => {
          this.toastService.showSuccess("Receita removida com sucesso!");
          this.getReceitas();
        },
        (error) => {
          this.toastService.showError("Erro ao tentar remover receita: "+ error.error.message);
        })
      }
    });
  }
}
