import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutenticacaoModule } from './services/autenticacao/autenticacao.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { RodapeComponent } from './components/rodape/rodape.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutenticacaoModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
