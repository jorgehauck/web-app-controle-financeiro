import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delecao',
  templateUrl: './modal-delecao.component.html',
  styleUrls: ['./modal-delecao.component.css']
})
export class ModalDelecaoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDelecaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  ngOnInit(): void {
  }

  public onConfirmar(result: boolean): void {
    this.dialogRef.close(result);
  }

}
