import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../login-usuario/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReactiveService } from '../reactive/reactive-service/reactive.service';
import { ReactiveComponent } from '../reactive/reactive.component';
import { StateService } from '../state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mostrarNavbar: boolean = true;

  showForm: boolean = true;
  private usuarios: any[] = [];
  colunasVisiveis: string[] = [
    'id',
    'nome',
    'sobrenome',
    'cpf',
    'dataDeNascimento',
    'genero',
    'action',
  ];
  colunasOpcionais: string[] = [
    'nomeSocial',
    'cidade',
    'estado',
    'cep',
    'logradouro',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private authService: AuthService,
    private _dialog: MatDialog,
    private reactiveService: ReactiveService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.authService.mostrarNavbarEmitter.subscribe((mostrar) => {
      this.mostrarNavbar = mostrar;
    });
    this.getUsuarioList();
    this.stateService.formState$.subscribe((formValues) => {
      this.atualizarColunasVisiveis(formValues);
    });
  }

  abrirCriarUsuario() {
    this.showForm = true;
  }

  onFormClose(updated: boolean) {
    this.showForm = false;
    if (updated) {
      this.getUsuarioList();
    }
  }

  atualizarColunasVisiveis(formValues: any) {
    this.colunasVisiveis = [
      'id',
      'nome',
      'sobrenome',
      'cpf',
      'dataDeNascimento',
      'genero',
    ];
    this.colunasOpcionais.forEach((column) => {
      if (formValues[column]) {
        this.colunasVisiveis.push(column);
      }
    });
    this.colunasVisiveis.push('action');
  }

  getUsuarioList() {
    this.reactiveService.getUsuarioList().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  deleteUsuario(id: number) {
    this.reactiveService.deleteUsuario(id).subscribe({
      next: (response) => {
        alert('Usário deletado!');
        this.getUsuarioList();
      },
      error: console.log,
    });
  }

  abrirEditarUsuario(data: any) {
    const dialogRef = this._dialog.open(ReactiveComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getUsuarioList();
        }
      },
    });
  }
}
