import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 1dd75ad4-8731-47ee-bel69-dc729680e1d2'
    })
  }

  private jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/librosfs.firebasestorage.app/o/personas.json?alt=media&token=1dd75ad4-8731-47ee-be69-dc729680e1d2'; 

  private lista:any;

  constructor(private http: HttpClient) {}

  getJsonData(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }

  MetodoPersona(listaPersonas:any) {
    console.log(listaPersonas);
    this.http.post(this.jsonUrl,listaPersonas,this.httpOptions).subscribe(
      response => {
        console.log('Archivo JSON sobrescrito con exito', response);
      },
      error => {
        console.error('Error al sobrescribir el archivo JSON', error);
      })
  }
}