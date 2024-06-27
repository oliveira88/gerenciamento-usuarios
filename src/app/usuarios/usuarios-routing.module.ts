import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { authGuard } from '../auth/auth.guard';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { ManterUsuariosRfComponent } from './reactive-form/manter-usuarios-rf/manter-usuarios-rf.component';
import { ManterUsuariosTdfComponent } from './template-driven-form/manter-usuarios-tdf/manter-usuarios-tdf.component';
import { canDeactivateGuard } from '../can-deactivate.guard';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'rf/manter-usuarios/:formMode',
        canDeactivate: [canDeactivateGuard],
        component: ManterUsuariosRfComponent
      },
      {
        path: 'tdf/manter-usuarios/:formMode',
        canDeactivate: [canDeactivateGuard],
        component: ManterUsuariosTdfComponent
      },
      {
        path: ':formType',
        component: ListaUsuariosComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
