import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 8c275f7f-830c-4d95-b189-f2454351cf3f'
    })
  }

  private getHeaders(): HttpHeaders {
    const token = '8c275f7f-830c-4d95-b189-f2454351cf3f';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/librosfs.firebasestorage.app/o/Usuarios.json?alt=media&token=8c275f7f-830c-4d95-b189-f2454351cf3f'; 

  Usuarios: any[] = [];

  constructor(private http: HttpClient) {}

  getJsonDataUsuario(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }

  returnListaUsuarios(){
    this.getJsonDataUsuario().subscribe(data => {
      this.Usuarios = data;
    });
  }

  MetodoUsuario(listaUsuarios:any) {
    console.log(listaUsuarios);
    this.http.post(this.jsonUrl,listaUsuarios,this.httpOptions).subscribe(
      response => {
        console.log('Archivo JSON sobrescrito con exito', response);
      },
      error => {
        console.error('Error al sobrescribir el archivo JSON', error);
      })
  }

  getProfile(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.jsonUrl}/perfil`, { headers: this.getHeaders() });
  }
}