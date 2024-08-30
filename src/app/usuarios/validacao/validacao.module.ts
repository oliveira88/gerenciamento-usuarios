import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cpfValidatorDirective } from './cpf.validator.directive';


@NgModule({
  declarations: [cpfValidatorDirective],
  imports: [
    CommonModule
  ],
  exports: [cpfValidatorDirective]
})
export class ValidacaoModule { }
