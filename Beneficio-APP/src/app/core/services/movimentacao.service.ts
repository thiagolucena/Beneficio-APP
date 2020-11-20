import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficio } from 'src/app/shared/models/Beneficio';
import { MovimentacaoBeneficio } from 'src/app/shared/models/MovimentacaoBeneficio';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {
  movimentacao: MovimentacaoBeneficio;
  json: string;

  baseURL = 'https://localhost:44345/api/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  post(value: number, value2: number, value3: number): Observable<MovimentacaoBeneficio>{    
    this.json = JSON.stringify({'beneficioId': value, 'dataTramitacao': new Date(), 'setorOrigemID': value2, 'setorDestinoId': value3});
    console.log(this.json);
    return this.http.post<MovimentacaoBeneficio>(this.baseURL + 'movimentacao', this.json, this.httpOptions);
  }

}
