import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 262f74d1-5983-4eb2-bbfc-53b38bcf4f3b'
    })
  }
  private jsonPerfiles = "https://firebasestorage.googleapis.com/v0/b/librosfs.firebasestorage.app/o/Perfiles.json?alt=media&token=262f74d1-5983-4eb2-bbfc-53b38bcf4f3b";

  constructor(private http: HttpClient) { }

  getJsonPerfiles(): Observable<any> {
    return this.http.get(this.jsonPerfiles);
  }

  MetodoPerfil(listaPerfiles:any) {
    console.log(listaPerfiles);
    this.http.post(this.jsonPerfiles,listaPerfiles,this.httpOptions).subscribe(
      response => {
        console.log('Archivo JSON sobrescrito con exito', response);
      },
      error => {
        console.error('Error al sobrescribir el archivo JSON', error);
      })
  }
}
