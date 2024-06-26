import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { HomeComponent } from './home/home.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { AuthGuard } from './guard/auth-guard';

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
    canActivate: [AuthGuard],
    children: [
      { path: 'usuario', component: ReactiveComponent },
      { path: 'usuario/:id', component: ReactiveComponent },
    ],
  },
];

export const routing: ModuleWithProviders<RouterModule> =
  RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes), routing],
  exports: [RouterModule],
})
export class AppRoutingModule {}
