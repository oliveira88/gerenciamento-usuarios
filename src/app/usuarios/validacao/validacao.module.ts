import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cpfValidatorDirective } from '../validacao/cpf.validator'


@NgModule({
  declarations: [cpfValidatorDirective],
  imports: [
    CommonModule
  ],
  exports: [cpfValidatorDirective]
})
export class ValidacaoModule { }
