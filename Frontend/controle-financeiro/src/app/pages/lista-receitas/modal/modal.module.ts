import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule} from 'ngx-mask';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from 'src/app/shared/angular-material/material.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ]
})
export class ModalModule { }
