import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Usuario } from './IUsuario';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss'],
})
export class LoginUsuarioComponent implements OnInit {
  public usuario: Usuario = { nome: '', senha: '' };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  fazerLogin(): void {
    this.authService.fazerLogin(this.usuario);
  }
}
