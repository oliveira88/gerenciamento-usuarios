import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { USUARIOS } from './mock-usuarios';
import { Usuario } from './usuario';
import { BehaviorSubject, Observable, Subject, concat, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioStorageService {

  id!: number;
  usuariosArray!: Usuario[];
  usuarios$!: BehaviorSubject<Usuario[]>;

  // Para a Service, colocar esse código no ngOnInit faria com esse código não fosse executado mesmo ao término do processo de bootstrap
  constructor( private localStorageService: LocalStorageService ) {

    // Caso não exista nada no localStorage sob a key 'usuarios', persiste os usuários em './mock-usuarios'
    if( this.localStorageService.getItem( "usuarios" ) === null ) {
      this.localStorageService.setItem( "usuarios", JSON.stringify(USUARIOS) );
    }

    this.usuariosArray = JSON.parse( this.localStorageService.getItem( "usuarios" )! );
    this.usuarios$ = new BehaviorSubject<Usuario[]>( this.usuariosArray );
  }

  getUsuarios(): BehaviorSubject<Usuario[]> {
    return this.usuarios$;
  }

  criarUsuario( usuario: Usuario ): void {

    const maiorIdAtual: number = this.getMaiorId();

    usuario.id = maiorIdAtual + 1;

    this.usuariosArray.push( usuario );
    this.usuarios$.next( this.usuariosArray );

    this.localStorageService.setItem( "usuarios", JSON.stringify( this.usuariosArray ) );
  }

  getUsuario( id: number ): Usuario {
    return this.usuariosArray.find(elem => elem.id === id)!;
  }

  excluirUsuario( usuario: Usuario ): void {

    this.usuariosArray = this.usuariosArray.filter(elem => elem.id !== usuario.id);
    this.usuarios$.next( this.usuariosArray );

    this.localStorageService.setItem( "usuarios", JSON.stringify( this.usuariosArray ) );
  }

  editarUsuario( usuario: Usuario ): void {

    this.usuariosArray = this.usuariosArray.filter(elem => elem.id !== usuario.id);
    
    this.usuariosArray.push( usuario );
    this.usuarios$.next( this.usuariosArray );

    this.localStorageService.setItem( "usuarios", JSON.stringify( this.usuariosArray ) );
  }

  getMaiorId(): number {

    let maiorId: number = 0;

    this.usuariosArray.forEach( (elem) => {

      if( elem.id > maiorId ) {
        maiorId = elem.id;
      }

    })

    return maiorId;
  }
}
