import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficio } from 'src/app/shared/models/Beneficio';
import { Categoria } from 'src/app/shared/models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {

  json: string;

  baseURL = 'https://localhost:44345/api/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  getBeneficioByMatricula(value: string): Observable<Beneficio>{
    return this.http.get<Beneficio>(this.baseURL + 'beneficio/getByMatricula/' + value);
  }

  delete(value: number): Observable<Beneficio>{
    return this.http.delete<Beneficio>(this.baseURL + 'beneficio/' + value);
  }

  update(value: Beneficio): Observable<Beneficio>{
    this.json = JSON.stringify(value);
    console.log(this.json);
    return this.http.put<Beneficio>(this.baseURL + 'beneficio/' + value.id, this.json, this.httpOptions);
  }

  post(value: Beneficio): Observable<Beneficio>{
    this.json = JSON.stringify(value);
    return this.http.post<Beneficio>(this.baseURL + 'beneficio', this.json, this.httpOptions);
  }

  postAlternativo(value: number, value2: number, value3: number ): Observable<Beneficio>{
    this.json = JSON.stringify({"orgaoId": value, "servidorId": value2, "setorId": value3, "dataCadastro": new Date()});
    console.log(this.json);
    return this.http.post<Beneficio>(this.baseURL + 'beneficio', this.json, this.httpOptions);
  }

  getCategoriaAll(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.baseURL + 'categoria');
  }

  getCategoriaById(value: number): Observable<Categoria>{
    return this.http.get<Categoria>(this.baseURL + 'categoria/' + value);
  }

}
