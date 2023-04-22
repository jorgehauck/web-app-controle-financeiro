import { Component, OnInit } from '@angular/core';
import { Receitas } from 'src/app/model/Receitas';
import { ReceitasService } from 'src/app/services/receitas/receitas.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-lista-receitas',
  templateUrl: './lista-receitas.component.html',
  styleUrls: ['./lista-receitas.component.css']
})
export class ListaReceitasComponent implements OnInit {

  receitas!: Array<Receitas>;

  constructor(
    private receitasService: ReceitasService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getReceitas();
  }

  private getReceitas(): void {
    this.receitasService.getReceitas().subscribe(page => {
      this.receitas = page.content;
    },
    (error) => {
      this.toastService.showError("Erro ao exibir receitas" + error);
    });
  }
}
