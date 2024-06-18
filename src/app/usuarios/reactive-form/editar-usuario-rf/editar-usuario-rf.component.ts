import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-usuario-rf',
  templateUrl: './editar-usuario-rf.component.html',
  styleUrl: './editar-usuario-rf.component.scss'
})
export class EditarUsuarioRfComponent {

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.route.
  }

  id!: number;
}
