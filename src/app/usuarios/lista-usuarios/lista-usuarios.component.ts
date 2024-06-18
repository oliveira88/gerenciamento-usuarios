import { Component } from '@angular/core';
import { USUARIOS } from '../mock-usuarios';
import { Usuario } from '../usuario';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  usuarios!: Usuario[];

  ngOnInit() {
    this.usuarios = USUARIOS;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
