import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReceitasService } from 'src/app/services/receitas/receitas.service';
import { ToastService } from 'src/app/services/toast.service';
import { Receitas } from '../../../model/Receitas';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {

  formModal!: FormGroup;

  item!: Receitas;

  // @Input()
  // isForReceitas!: boolean;

  receitas!: Receitas;

  tituloModal!: string;

  constructor(
    private toastrService: ToastService,
    private matDialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private receitasService: ReceitasService,
    private formBuilder: FormBuilder)
    {}

  ngOnInit(): void {
    this.configurarFormulario();
    this.aoEditar();
  }

  public salvar(): void {
    if(this.data) {
      console.log("DADOS: ", this.data);
      // this.atualizarReceita(this.data.id, this.data);
      return;
    }
    console.log("CRIAÇÃO!!!!");
  }

  public createReceita(): void {
    let dataReceita = this.formModal.get('data')?.value;
    const dataFormatada = new DatePipe('pt-BR').transform(dataReceita, 'dd/MM/yyyy');

    const novaReceita = {
      data: dataFormatada,
      valor: this.formModal.get('valor')?.value,
      descricao: this.formModal.get('descricao')?.value
    } as Receitas;

    this.receitasService.cadastrarReceitas(novaReceita).subscribe(() => {
      this.toastrService.showSuccess("Receita adicionada com sucesso!");
      this.fecharDialog();
    },
    (error) => {
      this.toastrService.showError("Erro ao adicionar receita! " + error.error.message);
    });
  }

  private atualizarReceita(id: number, item: Receitas): void {
    this.receitasService.atualizarReceita(id, item).subscribe(() => {
      this.toastrService.showSuccess('Receita atualizada com sucesso!');
      this.fecharDialog();
    },
    (error) => {
        this.toastrService.showError('Erro ao atualizar receita' + error);
    });
  }

  private aoEditar(): void {
    const data = this.data.data;
    const dataConvertida = new Date(data).toLocaleString('pt-BR');
    const dataOriginal = new Date(dataConvertida);

    this.formModal.setValue({
      data: dataOriginal,
      valor: this.data.valor,
      descricao: this.data.descricao,
    });
  }

  public configurarFormulario(): void {
    this.formModal = this.formBuilder.group({
      data: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  public fecharDialog(): void {
    let dados = {
      data: this.formModal.get('data')?.value,
      descricao: this.formModal.get('descricao')?.value,
      valor: this.formModal.get('valor')?.value
    }
    this.matDialogRef.close(dados);
  }

}
