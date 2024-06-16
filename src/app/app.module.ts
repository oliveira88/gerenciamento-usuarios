import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { AuthService } from './login-usuario/auth.service';
import { HomeComponent } from './home/home.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { TelaUsuarioComponent } from './tela-usuario/tela-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUsuarioComponent,
    HomeComponent,
    TemplateDrivenComponent,
    ReactiveComponent,
    TelaUsuarioComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
