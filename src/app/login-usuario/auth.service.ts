import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './IUsuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public usuarioAutenticado: boolean = false;

  mostrarNavbarEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  fazerLogin(usuario: Usuario) {
    if (usuario.nome === 'usuario@email.com' && usuario.senha === '1234') {
      this.usuarioAutenticado = true;
      this.mostrarNavbarEmitter.emit(true);

      this.router.navigate(['/home']);
    } else {
      this.usuarioAutenticado = false;
      this.mostrarNavbarEmitter.emit(false);

      this.router.navigate(['login']);
    }
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }
}
