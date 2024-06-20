import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveService } from './reactive.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss'],
})
export class ReactiveComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private drivenService: ReactiveService,
    private dialogRef: MatDialogRef<ReactiveService>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
    this.reactiveForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.reactiveForm.valid) {
      if (this.data) {
        this.drivenService
          .editarUsuario(this.data.id, this.reactiveForm.value)
          .subscribe({
            next: (valid: any) => {
              alert('Usuário editado!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.drivenService.addUsuario(this.reactiveForm.value).subscribe({
          next: (valid: any) => {
            alert('Usuário criado!');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
