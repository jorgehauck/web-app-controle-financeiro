import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from 'src/app/enums/Categoria.enum';
import { DespesasService } from 'src/app/services/despesas/despesas.service';
import { ReceitasService } from 'src/app/services/receitas/receitas.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {

  formGroup!: FormGroup;

  @Input()
  item!: any;

  @Input()
  isForReceitas!: boolean;

  categorias: Categoria[] = [
    Categoria.ALIMENTACAO,
    Categoria.SAUDE,
    Categoria.MORADIA,
    Categoria.TRANSPORTE,
    Categoria.EDUCACAO,
    Categoria.LAZER,
    Categoria.IMPREVISTOS,
    Categoria.OUTRAS
  ]

  constructor(
    public activeModal: NgbActiveModal,
    private toastrService: ToastService,
    private receitasService: ReceitasService,
    private despesasService: DespesasService,
    private formBuilder: FormBuilder)
    {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      data: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
    });
    this.aoEditar();
  }

  public fecharModal(): void {
    this.activeModal.close();
  }

  public salvar(): void {
    if (this.isForReceitas) {
        this.receitasService.atualizarReceita(this.item.id, this.item).subscribe(() => {
        this.toastrService.showSuccess('Receita atualizada com sucesso!');
        this.fecharModal();
      },
    (error) => {
        this.toastrService.showError('Erro ao atualizar receita' + error);
        }
      );
    }
    else {
        this.despesasService.atualizarDespesa(this.item.id, this.item).subscribe(() => {
        this.toastrService.showSuccess('Despesa atualizada com sucesso!');
        this.fecharModal();
      },
      (error) => {
          this.toastrService.showError('Erro ao atualizar despesa! ' + error);
        }
      );
    }
    if(!this.isForReceitas) {
      this.adicionarReceita();
    }
  }

  private adicionarReceita(): void {
    this.receitasService.cadastrarReceitas(this.item).subscribe(() => {
      this.toastrService.showSuccess("Receita adcionada com sucesso!");
      this.fecharModal();
    },
    (error) => {
      this.toastrService.showError("Erro ao adicionar receita! " + error);
    })
  }

  private aoEditar(): void {
    this.formGroup.setValue({
      data: this.item.data,
      valor: this.item.valor,
      descricao: this.item.descricao,
    });
  }
}
