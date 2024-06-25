import { Component, OnInit } from '@angular/core';
import { TemplateDrivenService } from './template-driven.service';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss'],
})
export class TemplateDrivenComponent implements OnInit {
  data: any;
  abaixoDezoito: boolean = false;
  abaixoDoze: boolean = false;

  usuario: any = {
    id: '',
    nome: '',
    sobrenome: '',
    cpf: '',
    dataDeNascimento: '',
    genero: '',
    nomeSocial: '',
    cidade: '',
    estado: '',
    cep: '',
    logradouro: '',
  };

  constructor(
    private templateService: TemplateDrivenService,
    private router: Router,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.usuario = { ...this.data };
    }
  }

  checarIdade(): void {
    const ddn = this.usuario.dataDeNascimento;
    if (ddn) {
      const idade = this.calcularIdade(new Date(ddn));
      if (idade < 12) {
        this.abaixoDoze = true;
      } else {
        this.abaixoDoze = false;
        if (idade < 18) {
          this.abaixoDezoito = true;
        } else {
          this.abaixoDezoito = false;
        }
      }
    }
  }

  calcularIdade(aniversario: Date): number {
    const idadeDifMs = Date.now() - aniversario.getTime();
    const dataIdade = new Date(idadeDifMs);
    return Math.abs(dataIdade.getUTCFullYear() - 1970);
  }

  onCancel() {
    this.usuario = {
      id: '',
      nome: '',
      sobrenome: '',
      cpf: '',
      dataDeNascimento: '',
      genero: '',
      nomeSocial: '',
      cidade: '',
      estado: '',
      cep: '',
      logradouro: '',
    };
  }

  onFormSubmit() {
    if (this.isFormValid()) {
      if (this.data) {
        this.templateService
          .editarUsuario(this.data.id, this.usuario)
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
        this.templateService.addUsuario(this.usuario).subscribe({
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
    this.stateService.atualizarFormState(this.usuario);
  }

  isFormValid(): boolean {
    return (
      this.usuario.nome &&
      this.usuario.sobrenome &&
      this.usuario.cpf &&
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(this.usuario.cpf) &&
      this.usuario.dataDeNascimento &&
      !this.abaixoDoze
    );
  }
}
