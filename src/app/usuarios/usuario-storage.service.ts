import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { USUARIOS } from './mock-usuarios';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioStorageService {

  id!: number;

  // Para a Service, colocar esse código no ngOnInit faria com esse código não fosse executado mesmo ao término do processo de bootstrap
  constructor( private localStorageService: LocalStorageService ) {

    // Caso não exista nada no localStorage sob a key 'usuarios', persiste alguns usando os usuários em './mock-usuarios'
    if( this.localStorageService.getItem( "usuarios" ) === null ) {
      this.localStorageService.setItem( "usuarios", JSON.stringify(USUARIOS) );
    }
    else{
      this.usuarios = JSON.parse( this.localStorageService.getItem( "usuarios" )! );
    }
  }

  usuarios!: Usuario[];

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  criarUsuario( usuario: Usuario ): void {

    const maiorIdAtual: number = this.getMaiorId( this.usuarios );

    usuario.id = maiorIdAtual + 1;

    this.usuarios.push( usuario );
    this.localStorageService.setItem( "usuarios", JSON.stringify( this.usuarios ) );
  }

  getUsuario( id: number ): Usuario {
    return this.usuarios.find(elem => elem.id === id)!;
  }

  excluirUsuario( usuario: Usuario ): void {
    console.log(this.usuarios);
    this.usuarios = this.usuarios.filter(elem => elem.id !== usuario.id);
    console.log(this.usuarios);
  }

  editarUsuario( usuario: Usuario ): void {

    this.usuarios = this.usuarios.filter(elem => elem.id !== usuario.id);
    this.usuarios.push( usuario );
  }

  getMaiorId( usuarios: Usuario[] ): number {

    let maiorId: number = 0;

    this.usuarios.forEach( (elem) => {

      if( elem.id > maiorId ) {
        maiorId = elem.id;
      }

    })

    return maiorId;
  }
}
