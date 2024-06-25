import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../login-usuario/auth.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReactiveService } from '../reactive/reactive-service/reactive.service';
import { StateService } from '../state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mostrarNavbar: boolean = true;

  showForm: boolean = true;
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
    'cpfResponsavel',
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
    private reactiveService: ReactiveService,
    private stateService: StateService,
    private router: Router
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
    this.router.navigate(['/reactive-form/criar-usuario']);
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
      'cpfResponsavel',
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
    this.showForm = true;
    this.router.navigate(['reactive-form', data.id]);
  }
}
