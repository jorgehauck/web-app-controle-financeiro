import { Component, OnInit } from '@angular/core';
import { DespesasService } from './../../services/despesas/despesas.service';
import { ToastService } from 'src/app/services/toast.service';
import { Despesas } from 'src/app/model/Despesas';

@Component({
  selector: 'app-lista-despesas',
  templateUrl: './lista-despesas.component.html',
  styleUrls: ['./lista-despesas.component.css']
})
export class ListaDespesasComponent implements OnInit {

  despesas!: Array<Despesas>;

  constructor(
    private despesasService: DespesasService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getDespesas();
  }

  private getDespesas() {
    this.despesasService.getDespesas().subscribe(page => {
      this.despesas = page.content;
    },
    (error) => {
      this.toastService.showError("Erro ao exibir despesas " + error);
    })
  }

}
