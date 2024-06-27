import { Component, Input } from '@angular/core';
import { Endereco, Usuario } from '../../usuario';
import { UsuarioStorageService } from '../../usuario-storage.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manter-usuarios-rf',
  templateUrl: './manter-usuarios-rf.component.html',
  styleUrl: './manter-usuarios-rf.component.scss'
})
export class ManterUsuariosRfComponent {

  @Input() formMode!: string;
  @Input() editId!: string;
  usuario = new Usuario();
  endereco = new Endereco();

  usuarioForm = this.formBuilder.group({
    nome: [''],
    dataDeNascimento: [''],
    cpf: [''],
    cpfResponsável: [''],
    email: [''],
    isAdmin: new FormControl(false),
    nomeSocial: [''],
    endereco: this.formBuilder.group({
      cidade: [''],
      estado: [''],
      cep: [''],
      logradouro: [''],
    })
  })

  idade!: number;

  constructor(
    private usuarioStorageService: UsuarioStorageService,
    private router: Router,
    private formBuilder: FormBuilder
   ) {}

  ngOnInit() {

    if( this.formMode === 'editar' ) {
      this.usuario = Object.assign({}, this.usuarioStorageService.getUsuario( parseInt(this.editId) ));
      this.updateIdade( this.usuario.dataDeNascimento );
      this.atualizarFormGroup( this.usuario, this.usuario.endereco );
    }
  }

  atualizarFormGroup( usuario: Usuario, endereco: Endereco | undefined ) {
    this.usuarioForm.patchValue({
      nome: usuario.nome,
      dataDeNascimento: usuario.dataDeNascimento,
      cpf: usuario.cpf,
      email: usuario.email,
      isAdmin: usuario.isAdmin,
    });

    if( endereco !== undefined ) {
      this.usuarioForm.get('endereco')?.patchValue({
        cidade: endereco.cidade,
        estado: endereco.estado,
        cep: endereco.cep,
        logradouro: endereco.logradouro
      });
    }

    if( usuario.nomeSocial !== undefined ) {
      this.usuarioForm.patchValue({
        nomeSocial: usuario.nomeSocial
      });
    }

    if( usuario.cpfResponsavel !== undefined ) {
      this.usuarioForm.patchValue({
        cpfResponsável: usuario.cpfResponsavel
      });
    }
  }

  criarSubmit( usuarioForm: FormGroup ): void {

    if( usuarioForm.valid ) {

      this.formGroupParaUsuario( usuarioForm );
      this.formataCamposOpcionais();
      this.usuarioStorageService.criarUsuario( this.usuario );
    }

    this.router.navigate(['/usuarios/rf']);
  }

  editarSubmit( usuarioForm: FormGroup ): void {

    if( usuarioForm.valid ) {

      this.formGroupParaUsuario( usuarioForm );
      console.log(this.usuario.nomeSocial);
      this.formataCamposOpcionais();
      console.log(this.usuario.nomeSocial);
      this.usuarioStorageService.editarUsuario( this.usuario );
    }

    this.router.navigate(['/usuarios/rf']);
  }

  formGroupParaUsuario( usuarioForm: FormGroup ): void {

    this.usuario.nome = usuarioForm.value.nome;
    this.usuario.dataDeNascimento = usuarioForm.value.dataDeNascimento;
    this.usuario.cpf = usuarioForm.value.cpf;
    this.usuario.cpfResponsavel = usuarioForm.value.cpfResponsavel;
    this.usuario.email = usuarioForm.value.email;
    this.usuario.isAdmin = usuarioForm.value.isAdmin;
    this.usuario.nomeSocial = usuarioForm.value.nomeSocial;
    this.endereco.cidade = usuarioForm.get('endereco')!.value.cidade!;
    this.endereco.estado = usuarioForm.get('endereco')!.value.estado!;
    this.endereco.cep = usuarioForm.get('endereco')!.value.cep!;
    this.endereco.logradouro = usuarioForm.get('endereco')!.value.logradouro!;

    this.usuario.endereco = this.endereco;
  }

  formataCamposOpcionais(): void {

    if( this.nomeSocialVazio() ) {
      this.usuario.nomeSocial = undefined;
    }

    if( this.cpfResponsavelVazio() ) {
      this.usuario.cpfResponsavel = undefined;
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

  cpfResponsavelVazio(): boolean {

    if( this.usuario.cpfResponsavel === '' ) {
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

    this.router.navigate(['/usuarios/rf']);
  }
}
