import { Component } from '@angular/core';
import { AuthService } from '../login-usuario/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  mostrarNavbar: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.mostrarNavbarEmitter.subscribe((mostrar) => {
      this.mostrarNavbar = mostrar;
    });
  }
}
