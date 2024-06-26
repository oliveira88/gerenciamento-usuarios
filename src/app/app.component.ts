import { Component } from '@angular/core';
import { AuthService } from './login-usuario/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gerenciamento-usuarios';
}
