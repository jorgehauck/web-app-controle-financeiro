import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Receitas } from 'src/app/model/Receitas';
import { DespesasService } from 'src/app/services/despesas/despesas.service';
import { ReceitasService } from 'src/app/services/receitas/receitas.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()
  item!: any;

  @Input()
  isForReceitas!: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private toastrService: ToastService,
    private receitasService: ReceitasService,
    private despesasService: DespesasService
  ) { }

  ngOnInit(): void {
  }

  public fecharModal(): void {
    this.activeModal.close();
  }

  public salvar(): void {
    if(this.isForReceitas) {
      this.receitasService.atualizarReceita(this.item.id, this.item).subscribe(() => {
        this.toastrService.showSuccess("Receita atualizada com sucesso!");
        this.fecharModal();
      },
      (error) => {
        this.toastrService.showError("Erro ao atualizar receita" + error);
      });
    }
    else {
      this.despesasService.atualizarDespesa(this.item.id, this.item).subscribe(() => {
        this.toastrService.showSuccess("Despesa atualizada com sucesso!");
        this.fecharModal();
      },
      (error) => {
        this.toastrService.showError("Erro ao atualizar despesa! " + error);
      });
    }
  }
}
