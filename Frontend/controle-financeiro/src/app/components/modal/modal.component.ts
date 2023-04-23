import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Despesas } from 'src/app/model/Despesas';
import { Receitas } from 'src/app/model/Receitas';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()
  itemReceita!: Receitas;

  @Input()
  itemDespesa!: Despesas;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  public fecharModal(): void {
    this.activeModal.close();
  }

}
