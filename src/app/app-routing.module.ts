import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { HomeComponent } from './home/home.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { AuthGuard } from './guard/auth-guard';
import { TelaUsuarioComponent } from './tela-usuario/tela-usuario.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginUsuarioComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'template-form',
    component: TemplateDrivenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reactive-form',
    component: ReactiveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tela-usuario',
    component: TelaUsuarioComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
