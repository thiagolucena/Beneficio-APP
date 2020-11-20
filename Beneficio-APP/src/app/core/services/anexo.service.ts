import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnexoBeneficio } from 'src/app/shared/models/AnexoBeneficio';
import { Beneficio } from 'src/app/shared/models/Beneficio';
import { Categoria } from 'src/app/shared/models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class AnexoService {

  json: string;

  baseURL = 'https://localhost:44345/api/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  postUpload(file: File, name: string) {
    const fileToUplaod = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUplaod, name);

    return this.http.post(this.baseURL + 'anexobeneficio/upload', formData);
  }

  postAnexo(value: number, value2: string, value3: number): Observable<AnexoBeneficio>{
    this.json = JSON.stringify({'beneficioId': value, 'urlAnexo': value2, 'categoriaId': value3});
    return this.http.post<AnexoBeneficio>(this.baseURL + 'anexobeneficio', this.json, this.httpOptions);
  }

}
