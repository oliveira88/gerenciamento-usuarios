import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManterUsuariosTdfComponent } from './manter-usuarios-tdf/manter-usuarios-tdf.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ValidacaoModule } from '../validacao/validacao.module'


@NgModule({
  declarations: [
    ManterUsuariosTdfComponent
  ],
  imports: [
    CommonModule,
    NgxMaskDirective,
    ValidacaoModule,
    FormsModule
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class TemplateDrivenFormModule { }
