import { Component } from '@angular/core';
import { AuthService } from '../login-usuario/auth.service';
import { Usuario } from '../login-usuario/IUsuario';
import { MatDialog } from '@angular/material/dialog';
import { TemplateDrivenComponent } from '../template-driven/template-driven.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  mostrarNavbar: boolean = true;

  constructor(private authService: AuthService, private _dialog: MatDialog) {}

  ngOnInit() {
    this.authService.mostrarNavbarEmitter.subscribe((mostrar) => {
      this.mostrarNavbar = mostrar;
    });
  }

  abrirCriarUsuario() {
    this._dialog.open(TemplateDrivenComponent);
  }
}
