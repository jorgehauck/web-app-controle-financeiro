import { Component, OnInit } from '@angular/core';
import { DespesasService } from './../../services/despesas/despesas.service';
import { ToastService } from 'src/app/services/toast.service';
import { Despesas } from 'src/app/model/Despesas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-lista-despesas',
  templateUrl: './lista-despesas.component.html',
  styleUrls: ['./lista-despesas.component.css']
})
export class ListaDespesasComponent implements OnInit {

  despesas!: Array<Despesas>;

  constructor(
    private despesasService: DespesasService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getDespesas();
  }

  private getDespesas(): void {
    this.despesasService.getDespesas().subscribe(page => {
      this.despesas = page.content;
    },
    (error) => {
      this.toastService.showError("Erro ao exibir despesas " + error);
    });
  }

  public abrirModal(item: Despesas): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.item = item;
  }

  public abrirModalConfirmacao(): void {
    const modalRef = this.modalService.open(ModalConfirmacaoComponent);
    modalRef.componentInstance.name = "";
  }
}
