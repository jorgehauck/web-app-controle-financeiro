import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ModalComponent],
  imports: [SharedModule]
})
export class ModalModule { }
