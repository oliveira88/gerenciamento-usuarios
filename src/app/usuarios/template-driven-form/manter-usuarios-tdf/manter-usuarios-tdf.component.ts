import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Endereco, Usuario } from '../../usuario';
import { UsuarioStorageService } from '../../usuario-storage.service';

@Component({
  selector: 'app-manter-usuarios-tdf',
  templateUrl: './manter-usuarios-tdf.component.html',
  styleUrl: './manter-usuarios-tdf.component.scss'
})
export class ManterUsuariosTdfComponent {

  @Input() formMode!: string;

  constructor( private usuarioStorageService: UsuarioStorageService ) {}
  
  usuario: Usuario = new Usuario();
  endereco: Endereco = new Endereco();

  onSubmit( usuarioForm: NgForm ) {

    if( usuarioForm.valid ) {
      this.usuarioStorageService.criarUsuario( this.usuario );
    }
  }
}
