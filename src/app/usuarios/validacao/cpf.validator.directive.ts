import { Validator, NG_VALIDATORS, ValidationErrors, AbstractControl } from '@angular/forms'
import { Directive } from '@angular/core';
import { cpfValidator } from './cpf.validator';
 
 
@Directive({
  selector: '[cpfTdfValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: cpfValidatorDirective, multi: true }
  ]
})
export class cpfValidatorDirective implements Validator {
 
  validate(control: AbstractControl): ValidationErrors | null {
 
    return cpfValidator()(control);
  }
}