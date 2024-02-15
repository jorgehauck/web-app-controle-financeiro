import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  formModal!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.configurarFormulario();
    this.aoEditar();
  }

  public configurarFormulario(): void {
    this.formModal = this.formBuilder.group({
      data: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  private aoEditar(): void {
    let data = this.data.item.data;
    let dataConvertida = new Date(data).toLocaleString('pt-BR');
    let dataOriginal = new Date(dataConvertida);

    this.formModal.setValue({
      data: dataOriginal,
      valor: this.data.item.valor,
      descricao: this.data.item.descricao,
    });
  }

  public salvar(): void {
    if (this.formModal.valid) {
      let result = {
        id: this.data.item ? this.data.item.id : null,
        descricao: this.formModal.get('descricao')?.value,
        valor: this.formModal.get('valor')?.value,
        data: this.formModal.get('data')?.value,
        tipoOperacao: this.data.item ? 'edicao' : 'insercao'
      }
      this.dialogRef.close(result);
    }
  }


  public fecharDialog(result: boolean): void {
    this.dialogRef.close(result);
  }
}
