import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReceitasService } from 'src/app/services/receitas/receitas.service';
import { ToastService } from 'src/app/services/toast.service';
import { Receitas } from '../../../model/Receitas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {

  formModal!: FormGroup;

  @Input()
  item!: any;

  @Input()
  isForReceitas!: boolean;

  receitas!: Receitas;

  constructor(
    public activeModal: NgbActiveModal,
    private toastrService: ToastService,
    private receitasService: ReceitasService,
    private formBuilder: FormBuilder)
    {}

  ngOnInit(): void {
    this.configurarFormulario();
    this.aoEditar();
  }

  public salvar(): void {
    this.createReceita();
  }

  public createReceita(): void {
    let dataReceita = this.formModal.get('data')?.value;
    let data = new Date(dataReceita);
    const dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

    const novaReceita = {
      data: dataFormatada,
      valor: this.formModal.get('valor')?.value,
      descricao: this.formModal.get('descricao')?.value
    } as Receitas;

    this.receitasService.cadastrarReceitas(novaReceita).subscribe(() => {
      this.toastrService.showSuccess("Receita adcionada com sucesso!");
      this.fecharModal();
      window.location.reload();
    },
    (error) => {
      this.toastrService.showError("Erro ao adicionar receita! " + error.error.message);
    });
  }

  private atualizarReceita(): void {
    this.receitasService.atualizarReceita(this.item.id, this.item).subscribe(() => {
      this.toastrService.showSuccess('Receita atualizada com sucesso!');
      this.fecharModal();
    },
    (error) => {
        this.toastrService.showError('Erro ao atualizar receita' + error);
    });
  }

  private aoEditar(): void {
    this.formModal.setValue({
      data: this.item.data,
      valor: this.item.valor,
      descricao: this.item.descricao,
    });
  }

  public configurarFormulario(): void {
    this.formModal = this.formBuilder.group({
      data: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  public fecharModal(): void {
    this.activeModal.close();
  }

}
