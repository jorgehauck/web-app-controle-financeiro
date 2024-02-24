import { Component, OnInit, ViewChild } from '@angular/core';
import { DespesasService } from './../../services/despesas/despesas.service';
import { ToastService } from 'src/app/services/toast.service';
import { Despesas } from 'src/app/model/Despesas';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-lista-despesas',
  templateUrl: './lista-despesas.component.html',
  styleUrls: ['./lista-despesas.component.css']
})
export class ListaDespesasComponent implements OnInit {

  despesas!: Array<Despesas>;

  public displayedColumns: string[] = ['descricao', 'valor', 'data', 'acoes'];
  public dataSource = new MatTableDataSource<Despesas>();

  @ViewChild('paginator') paginator!: MatPaginator;

  public loadingDespesas: boolean = true;

  constructor(
    private despesasService: DespesasService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDespesas();
  }

  public filterDespesas($event: any) {
    const despesa = $event.target.value;
    this.dataSource.filter = despesa;
  }

  private getDespesas(): void {
    this.despesasService.getDespesas().subscribe(page => {
      this.despesas = page.content;
      this.dataSource.data = this.despesas;

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
      this.toastService.showWarning('Erro ao exibir despesas! ' + error.error.message);
    })
  }

  public addDespesa(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { title: 'Adicionar Despesa' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.tipoOperacao === 'insercao') {
        let dataDespesa = new DatePipe('pt-BR').transform(result.data, 'dd/MM/yyyy') as string;
        let despesa = {
          descricao: result.descricao,
          valor: result.valor,
          data: dataDespesa,
          receitaId: 1, // Para fins de testes!!!
        } as Despesas;
        this.createDespesa(despesa);
      }
    })
  }

  public editReceita(item: Despesas): void {

  }

  public deleteReceita(item: Despesas): void {

  }


  private createDespesa(despesa: Despesas): void {
    this.despesasService.cadastrarDespesa(despesa).subscribe(() => {
      this.toastService.showSuccess('Despesa adicionada com sucesso!');
      this.getDespesas();
    },
    (error) => {
      this.toastService.showError("Erro ao adicionar despesa! " + error.error.message);
    });
  }
}
