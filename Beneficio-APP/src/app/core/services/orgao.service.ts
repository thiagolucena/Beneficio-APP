import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orgao } from 'src/app/shared/models/Orgao';

@Injectable({
  providedIn: 'root'
})
export class OrgaoService {

json: string;

baseURL = 'https://localhost:44345/api/';

constructor(private http: HttpClient) { }

getAllOrgao(): Observable<Orgao[]>{
  return this.http.get<Orgao[]>(this.baseURL + 'orgao');
}

}
