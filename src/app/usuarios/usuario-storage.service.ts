import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { USUARIOS } from './mock-usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioStorageService {

  // Para a Service, colocar esse código no ngOnInit faria com esse código não fosse executado mesmo ao término do processo de bootstrap
  constructor( private localStorageService: LocalStorageService ) {

    // Caso não exista nada no localStorage sob a key 'usuarios', persiste alguns usando os usuários em './mock-usuarios'
    if( this.localStorageService.getItem( "usuarios" ) === null ) {
      this.localStorageService.setItem( "usuarios", JSON.stringify(USUARIOS) );
    }
  }
}
