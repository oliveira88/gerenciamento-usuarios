import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit } from '@angular/core';
 
 
@Directive({
  selector: '[cpfValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: cpfValidatorDirective, multi: true }
  ]
})
export class cpfValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(c: FormControl) {
 
    const cpf: string = c.value;

	if (isNaN( +cpf )) {
		return { 'naoNumerico': true }
	  }
  
	if (cpf.length !== 11) {
		return { 'cpfNaoContem11Caracteres': true }
	}

	if (cpf === '11111111111' ||
		cpf === '22222222222' ||
		cpf === '33333333333' ||
		cpf === '44444444444' ||
		cpf === '55555555555' ||
		cpf === '66666666666' ||
		cpf === '77777777777' ||
		cpf === '88888888888' ||
		cpf === '99999999999'
	) {
		return { 'cpfInexistente': true }
	}

	// Primeiro dígito verificador
	const cpfSubstringDe9: string = cpf.substring(0, 9);

	const cpfVetor1: number[] = (cpfSubstringDe9.split('')).map(Number);
	const multVetor1: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2]

	let digito1: number;
	const verif1Vetor: number[] = cpfVetor1.map((e,i) => e * multVetor1[i])
	const verif1Soma: number = verif1Vetor.reduce((accumulator, currentValue) => {
		return accumulator + currentValue
	}, 0);
	const verif1Resto = verif1Soma % 11 ;
	if( verif1Resto < 2) {
		digito1 = 0;
	}
	else {
		digito1 = 11 - verif1Resto;
	}

	if (digito1 !== parseInt(cpf.substring(9, 10)) ) {
		return { 'CPF-invalido': true }
	}

	// Segundo dígito verificador
	const cpfSubstringDe10: string = cpf.substring(0, 10);

	const cpfVetor2: number[] = (cpfSubstringDe10.split('')).map(Number);
	const multVetor2: number[] = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

	let digito2: number;
	const verif2Vetor: number[] = cpfVetor2.map((e,i) => e * multVetor2[i])
	const verif2Soma: number = verif2Vetor.reduce((accumulator, currentValue) => {
		return accumulator + currentValue
	}, 0);
	const verif2Resto = verif2Soma % 11 ;
	if( verif2Resto < 2) {
		digito2 = 0;
	}
	else {
		digito2 = 11 - verif2Resto;
	}

	if (digito2 !== parseInt(cpf.substring(10, 11)) ) {
		return { 'CPF-invalido': true }
	}
	//
 
    return null;
  }
}