import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Setor } from 'src/app/shared/models/Setor';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  json: string;

  baseURL = 'https://localhost:44345/api/';
  
  constructor(private http: HttpClient) { }
  
  getAllSetor(): Observable<Setor[]>{
    return this.http.get<Setor[]>(this.baseURL + 'setor');
  }

}
