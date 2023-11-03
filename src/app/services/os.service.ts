import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OS } from '../Models/os';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OsService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http : HttpClient,
    private snack: MatSnackBar) { }

  findAll():Observable<OS[]>{
    const uri = this.baseUrl + "/os";
    return this.http.get<OS[]>(uri);
  }

  findById(id : any): Observable<OS>{
    const url = `${this.baseUrl}/os/${id}`;
   return this.http.get<OS>(url); 
  }

  create(os: OS): Observable<OS>{
    const url = this.baseUrl + "/os";
    return this.http.post<OS>(url, os);
  }

  update(os: OS):Observable<OS>{
    const url = `${this.baseUrl}/os/${os.id}`;
    return this.http.put<OS>(url, os);
  }

  delete(id : any): Observable<void>{
    const url = `${this.baseUrl}/os/${id}`;
    return this.http.delete<void>(url);
  }

  massage(msg : String): void{
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
  
}