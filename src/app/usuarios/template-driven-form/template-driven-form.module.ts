import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManterUsuariosTdfComponent } from './manter-usuarios-tdf/manter-usuarios-tdf.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ManterUsuariosTdfComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TemplateDrivenFormModule { }
