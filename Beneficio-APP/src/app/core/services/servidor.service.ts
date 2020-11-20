import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servidor } from 'src/app/shared/models/Servidor';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  json: string;

  baseURL = 'https://localhost:44345/api/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  
  getCategoriaByMatricula(value: string): Observable<Servidor>{
    return this.http.get<Servidor>(this.baseURL + 'servidor/getByMatricula/' + value);
  }

}
