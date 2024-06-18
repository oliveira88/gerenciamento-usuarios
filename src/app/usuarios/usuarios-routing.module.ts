import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CriarUsuarioRfComponent } from './reactive-form/criar-usuario-rf/criar-usuario-rf.component';
import { EditarUsuarioRfComponent } from './reactive-form/editar-usuario-rf/editar-usuario-rf.component';
import { CriarUsuarioTdfComponent } from './template-driven-form/criar-usuario-tdf/criar-usuario-tdf.component';
import { EditarUsuarioTdfComponent } from './template-driven-form/editar-usuario-tdf/editar-usuario-tdf.component';
import { authGuard } from '../auth/auth.guard';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'rf',
        children: [
          {
            path: 'criar-usuario',
            component: CriarUsuarioRfComponent
          },
          {
            path: 'editar-usuario',
            component: EditarUsuarioRfComponent
          }
        ]
      },
      {
        path: 'tdf',
        children: [
          {
            path: 'criar-usuario',
            component: CriarUsuarioTdfComponent
          },
          {
            path: 'editar-usuario',
            component: EditarUsuarioTdfComponent
          }
        ]
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
