import { Component, Input } from '@angular/core';
import { Endereco, Usuario } from '../../usuario';
import { UsuarioStorageService } from '../../usuario-storage.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-manter-usuarios-rf',
  templateUrl: './manter-usuarios-rf.component.html',
  styleUrl: './manter-usuarios-rf.component.scss'
})
export class ManterUsuariosRfComponent {

  @Input() formMode!: string;
  @Input() editId!: string;
  usuario: Usuario = new Usuario();
  endereco: Endereco = new Endereco();

  usuarioForm = new FormGroup({
    nome: new FormControl(this.usuario.nome),
    dataNascimento: new FormControl(this.usuario.dataDeNascimento),
    cpf: new FormControl(this.usuario.cpf),
    cpfResponsavel: new FormControl(this.usuario.cpfResponsavel),
    email: new FormControl(this.usuario.email),
    isAdmin: new FormControl(this.usuario.isAdmin),
    nomeSocial: new FormControl(this.usuario.nomeSocial),
    cidade: new FormControl(this.endereco.cidade),
    estado: new FormControl(this.endereco.estado),
    cep: new FormControl(this.endereco.cep),
    logradouro: new FormControl(this.endereco.logradouro),
  });

  idade!: number;

  constructor(
    private usuarioStorageService: UsuarioStorageService,
    private router: Router
   ) {}

  ngOnInit() {

    if( this.formMode === 'criar' ) {

      this.usuario = new Usuario();
      this.endereco = new Endereco();
    }
    else if( this.formMode === 'editar' ) {
      this.usuario = Object.assign({}, this.usuarioStorageService.getUsuario( parseInt(this.editId) ));
      this.updateIdade( this.usuario.dataDeNascimento );
    }
  }

  criarSubmit( usuarioForm: FormGroup ): void {

    if( usuarioForm.valid ) {

      this.formataCamposOpcionais();
      this.usuarioStorageService.criarUsuario( this.usuario );
    }

    this.router.navigate(['../']);
  }

  editarSubmit( usuarioForm: FormGroup ): void {

    if( usuarioForm.valid ) {

      this.formataCamposOpcionais();
      this.usuarioStorageService.editarUsuario( this.usuario );
    }

    this.router.navigate(['../']);
  }

  formataCamposOpcionais(): void {

    if( this.nomeSocialVazio() ) {
      this.usuario.nomeSocial = undefined;
    }

    if( this.enderecoVazio() ) {
      this.usuario.endereco = undefined;
    }
    else {
      this.usuario.endereco = this.endereco;
    }
  }

  nomeSocialVazio(): boolean {

    if( this.usuario.nomeSocial !== '' ) {
      return false;
    }

    return true;
  }

  enderecoVazio(): boolean {

    if(
      this.endereco.cidade !== '' || 
      this.endereco.estado !== '' ||
      this.endereco.cep !== '' ||
      this.endereco.logradouro !== ''
    ) {
      return false;
    }

    return true;
  }

  toDate( data: string ): Date {
    return new Date( data );
  }

  updateIdade( data: string ): void {
    const dataAtual = new Date();
    const dataNascimento = new Date( data );

    const dias = dataAtual.getDay() - dataNascimento.getDay();
    const meses = dataAtual.getMonth() - dataNascimento.getMonth();
    const anos = dataAtual.getFullYear() - dataNascimento.getFullYear();

    let idade = anos;

    // Se ainda não fez aniversário...
    if( dias <= 0 && meses <= 0 ) {
      idade = anos - 1;
    }

    this.idade = idade;
  }

  menorDe12(): boolean {

    if( this.idade >= 12 ) {
      return false;
    }

    return true;
  }

  menorDe18(): boolean {

    if( this.idade >= 18 ) {
      return false;
    }

    return true;
  }

  cancelar(): void {

    this.router.navigate(['../']);
  }
}
