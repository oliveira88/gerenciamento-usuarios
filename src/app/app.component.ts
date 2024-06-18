import { Component } from '@angular/core';
import { UsuarioStorageService } from './usuarios/usuario-storage.service';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gerenciamento-de-usuarios';

  constructor(
    private localStorageService: LocalStorageService,
    private usuarioStorageService: UsuarioStorageService
  ) {}
}
