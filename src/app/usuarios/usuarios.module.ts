import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { CriarUsuarioRfComponent } from './reactive-form/criar-usuario-rf/criar-usuario-rf.component';
import { EditarUsuarioRfComponent } from './reactive-form/editar-usuario-rf/editar-usuario-rf.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CriarUsuarioTdfComponent } from './template-driven-form/criar-usuario-tdf/criar-usuario-tdf.component';
import { EditarUsuarioTdfComponent } from './template-driven-form/editar-usuario-tdf/editar-usuario-tdf.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';


@NgModule({
  declarations: [
    CriarUsuarioRfComponent,
    EditarUsuarioRfComponent,
    UsuariosComponent,
    CriarUsuarioTdfComponent,
    EditarUsuarioTdfComponent,
    ListaUsuariosComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ],
  exports:[
    CriarUsuarioRfComponent,
    EditarUsuarioRfComponent,
  ]
})
export class UsuariosModule { }
