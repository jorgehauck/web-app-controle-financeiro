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
    @Inject(MAT_DIALOG_DATA) public receita: Receitas,
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
    console.log("DATA SELECIONADA: ", dataReceita);

    const dataFormatada = new DatePipe('pt-BR').transform(dataReceita, 'dd/MM/yyyy');
    console.log("DATA: ", dataFormatada);

    const novaReceita = {
      data: dataFormatada,
      valor: this.formModal.get('valor')?.value,
      descricao: this.formModal.get('descricao')?.value
    } as Receitas;

    console.log("RECEITA: ", novaReceita);


    this.receitasService.cadastrarReceitas(novaReceita).subscribe(() => {
      this.toastrService.showSuccess("Receita adicionada com sucesso!");
      this.fecharPopUp();
    },
    (error) => {
      this.toastrService.showError("Erro ao adicionar receita! " + error.error.message);
    });
  }

  public updateReceita(): void {
    if(this.item.id && this.item) {
        this.atualizarReceita();
    }
  }

  private atualizarReceita(): void {
    this.receitasService.atualizarReceita(this.item.id, this.item).subscribe(() => {
      this.toastrService.showSuccess('Receita atualizada com sucesso!');
      this.fecharPopUp();
    },
    (error) => {
        this.toastrService.showError('Erro ao atualizar receita' + error);
    });
  }

  private aoEditar(): void {
    const data = this.receita.data;
    const dataConvertida = new Date(data).toLocaleString('pt-BR');
    const dataOriginal = new Date(dataConvertida);

    this.formModal.setValue({
      data: dataOriginal,
      valor: this.receita.valor,
      descricao: this.receita.descricao,
    });
  }

  public configurarFormulario(): void {
    this.formModal = this.formBuilder.group({
      data: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  public fecharPopUp(): void {
    this.matDialogRef.close();
  }

}
