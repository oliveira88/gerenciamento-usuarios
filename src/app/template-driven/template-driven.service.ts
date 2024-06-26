import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TemplateDrivenService {
  constructor(private http: HttpClient) {}

  addUsuario(data: any): Observable<any> {
    const id = this.generateRandomId();
    data.id = id;
    return this.http.post('http://localhost:3000/usuarios', data);
  }

  editarUsuario(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/usuarios/${id}`, data);
  }

  getUsuarioById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/usuarios/${id}`);
  }

  getUsuarioList(): Observable<any> {
    return this.http.get('http://localhost:3000/usuarios');
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/usuarios/${id}`);
  }

  generateRandomId(): string {
    const min = Math.ceil(1);
    const max = Math.floor(10000);
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    return id.toString();
  }
}
