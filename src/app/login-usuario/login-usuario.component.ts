import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { UsuarioLogin } from './IUsuarioLogin';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss'],
})
export class LoginUsuarioComponent implements OnInit {
  public usuario: UsuarioLogin = { nome: '', senha: '' };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  fazerLogin(): void {
    this.authService.fazerLogin(this.usuario);
  }
}
