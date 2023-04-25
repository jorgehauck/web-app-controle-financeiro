import { Component, OnInit } from '@angular/core';
import { Receitas } from 'src/app/model/Receitas';
import { ReceitasService } from 'src/app/services/receitas/receitas.service';
import { ToastService } from 'src/app/services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';


@Component({
  selector: 'app-lista-receitas',
  templateUrl: './lista-receitas.component.html',
  styleUrls: ['./lista-receitas.component.css']
})
export class ListaReceitasComponent implements OnInit {

  receitas!: Array<Receitas>;

  constructor(
    private receitasService: ReceitasService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getReceitas();
  }

  private getReceitas(): void {
    this.receitasService.getReceitas().subscribe(page => {
      this.receitas = page.content;
    },
    (error) => {
      this.toastService.showError("Erro ao exibir receitas " + error);
    });
  }

  public abrirModal(item: Receitas): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.isForReceitas = true;
    modalRef.componentInstance.item = item;
  }

  public abrirModalConfirmacao(): void {
    const modalRef = this.modalService.open(ModalConfirmacaoComponent);
    modalRef.componentInstance.name = "";
  }
}
