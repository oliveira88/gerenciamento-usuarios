import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveService } from './reactive-service/reactive.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../state.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss'],
})
export class ReactiveComponent implements OnInit {
  reactiveForm: FormGroup;
  data: any;
  abaixoDezoito: boolean = false;
  abaixoDoze: boolean = false;

  constructor(
    private fb: FormBuilder,
    private reactiveService: ReactiveService,
    private router: Router,
    private stateService: StateService,
    private route: ActivatedRoute
  ) {
    this.reactiveForm = this.fb.group({
      id: [''],
      nome: [''],
      sobrenome: [''],
      cpf: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
        ],
      ],
      dataDeNascimento: ['', [Validators.required]],
      genero: [''],
      nomeSocial: [''],
      cidade: [''],
      estado: [''],
      cep: [''],
      logradouro: [''],
    });

    this.reactiveForm
      .get('dataDeNascimento')
      ?.valueChanges.subscribe((value) => {
        this.checarIdade();
      });
  }

  // ddn = data de nascimento
  checarIdade(): void {
    const ddn = this.reactiveForm.get('dataDeNascimento')?.value;
    if (ddn) {
      const idade = this.calcularIdade(new Date(ddn));
      if (idade < 12) {
        this.abaixoDoze = true;
        this.reactiveForm.disable();
      } else {
        this.abaixoDoze = false;
        this.reactiveForm.enable();
        if (idade < 18) {
          this.abaixoDezoito = true;
          this.reactiveForm.get('cpf')?.setValidators([Validators.required]);
        } else {
          this.abaixoDezoito = false;
          this.reactiveForm.get('cpf')?.clearValidators();
        }
        this.reactiveForm.get('cpf')?.updateValueAndValidity();
      }
    }
  }

  calcularIdade(aniversario: Date): number {
    const idadeDifMs = Date.now() - aniversario.getTime();
    const dataIdade = new Date(idadeDifMs);
    return Math.abs(dataIdade.getUTCFullYear() - 2003);
  }

  ngOnInit(): void {
    if (this.data) {
      this.reactiveForm.patchValue(this.data);
    }
  }

  onCancel() {
    this.reactiveForm.reset();
  }

  onFormSubmit() {
    if (this.reactiveForm.valid) {
      if (this.data) {
        this.reactiveService
          .editarUsuario(this.data.id, this.reactiveForm.value)
          .subscribe({
            next: () => {
              alert('Usuário editado!');
              this.onCancel();
              this.router.navigate(['/home']);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.reactiveService.addUsuario(this.reactiveForm.value).subscribe({
          next: () => {
            alert('Usuário criado!');
            this.onCancel();
            this.router.navigate(['/home']);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
    const formValues = this.reactiveForm.value;
    this.stateService.atualizarFormState(formValues);
  }
}
