import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsuariosComponent,
    ListaUsuariosComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule
  ],
  exports:[
    
  ]
})
export class UsuariosModule { }
