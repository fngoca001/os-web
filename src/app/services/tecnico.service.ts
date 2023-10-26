import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Tecnico } from '../Models/tecnico';
import { HttpClient } from '@angular/common/http';
import { ObserversModule } from '@angular/cdk/observers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  baseUrl: String = environment.baseUrl;

  constructor(private http : HttpClient) { }

  findAll():Observable<Tecnico[]>{
    const uri = this.baseUrl + "/tecnicos";
    return this.http.get<Tecnico[]>(uri);
  }
}
