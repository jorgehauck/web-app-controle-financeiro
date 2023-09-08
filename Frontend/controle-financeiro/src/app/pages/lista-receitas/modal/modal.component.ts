import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReceitasService } from 'src/app/services/receitas/receitas.service';
import { ToastService } from 'src/app/services/toast.service';
import { Receitas } from '../../../model/Receitas';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    let data = new Date(dataReceita);
    const dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

    const novaReceita = {
      data: dataFormatada,
      valor: this.formModal.get('valor')?.value,
      descricao: this.formModal.get('descricao')?.value
    } as Receitas;

    this.receitasService.cadastrarReceitas(novaReceita).subscribe(() => {
      this.toastrService.showSuccess("Receita adicionada com sucesso!");
      this.fecharPopUp();
    },
    (error) => {
      this.toastrService.showError("Erro ao adicionar receita! " + error.error.message);
    });
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
    this.formModal.setValue({
      data: this.receita.data,
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
