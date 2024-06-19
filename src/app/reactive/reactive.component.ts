import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveService } from './reactive.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss'],
})
export class ReactiveComponent implements OnInit {
  templateDrivenForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private drivenService: ReactiveService,
    private dialogRef: MatDialogRef<ReactiveService>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.templateDrivenForm = this.fb.group({
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
    this.templateDrivenForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.templateDrivenForm.valid) {
      if (this.data) {
        this.drivenService
          .editarUsuario(this.data.id, this.templateDrivenForm.value)
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
        this.drivenService.addUsuario(this.templateDrivenForm.value).subscribe({
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
