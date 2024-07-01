import { Component } from '@angular/core';
import { Usuario } from '../usuario';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { UsuarioStorageService } from '../usuario-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private usuarioStorageService: UsuarioStorageService,
  ) {}

  usuarios$!: Observable<Usuario[]>;

  ngOnInit() {
    this.usuarios$ = this.usuarioStorageService.getUsuarios();
  }

  excluir( usuario: Usuario ) {
    this.usuarioStorageService.excluirUsuario( usuario );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
