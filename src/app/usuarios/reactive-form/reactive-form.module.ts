import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManterUsuariosRfComponent } from './manter-usuarios-rf/manter-usuarios-rf.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ValidacaoModule } from '../validacao/validacao.module'

@NgModule({
  declarations: [
    ManterUsuariosRfComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    ValidacaoModule,
    FormsModule
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class ReactiveFormModule { }
