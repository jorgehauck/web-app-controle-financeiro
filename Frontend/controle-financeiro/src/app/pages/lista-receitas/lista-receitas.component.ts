import { Component, OnInit, ViewChild } from '@angular/core';
import { Receitas } from 'src/app/model/Receitas';
import { ReceitasService } from 'src/app/services/receitas/receitas.service';
import { ToastService } from 'src/app/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DatePipe } from '@angular/common';
import { ModalComponent } from './../../shared/components/modal/modal.component';
import { ModalDelecaoComponent } from './../../shared/components/modal-delecao/modal-delecao.component';


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

  public loadingReceitas: boolean = true;

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

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.tipoOperacao === 'insercao') {
        let dataReceita = new DatePipe('pt-BR').transform(result.data, 'dd/MM/yyyy') as string;
        let receita = {
          descricao: result.descricao,
          valor: result.valor,
          data: dataReceita
        } as Receitas
        this.createReceita(receita);
      }

    });
  }

  public editReceita(item: Receitas): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { title: 'Editar Receita', item: item },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.tipoOperacao === 'edicao') {
        let dataReceita = new DatePipe('pt-BR').transform(result.data, 'dd/MM/yyyy');
        let receita: Receitas;
        receita = {
          id: result.id,
          data: dataReceita,
          descricao: result.descricao,
          valor: result.valor
        }
        this.atualizarReceita(result.id, receita);
      }
    });
  }

  public deleteReceita(item: Receitas): void {
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

  private createReceita(receita: Receitas): void {
    this.receitasService.cadastrarReceitas(receita).subscribe(() => {
      this.toastService.showSuccess("Receita adicionada com sucesso!");
      this.getReceitas();
    },
    (error) => {
      this.toastService.showError("Erro ao adicionar receita! " + error.error.message);
    });
  }

  private atualizarReceita(id: number, item: Receitas): void {
    this.receitasService.atualizarReceita(id, item).subscribe(
      () => {
        this.toastService.showSuccess('Receita atualizada com sucesso!');
        this.getReceitas();
      },
      (error) => {
        this.toastService.showError('Erro ao atualizar receita' + error.error.message);
      }
    );
  }
}
