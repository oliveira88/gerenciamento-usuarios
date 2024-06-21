import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveService } from './reactive-service/reactive.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss'],
})
export class ReactiveComponent implements OnInit {
  reactiveForm: FormGroup;
  data: any; // Ajuste conforme necessário para o seu contexto

  constructor(
    private fb: FormBuilder,
    private reactiveService: ReactiveService,
    private router: Router
  ) {
    this.reactiveForm = this.fb.group({
      id: [''],
      nome: [''],
      sobrenome: [''],
      nomeSocial: [''],
      cpf: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
        ],
      ],
      dataDeNascimento: [''],
      genero: [''],
    });
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
              this.onCancel(); // Reseta o formulário após a edição
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
  }
}
