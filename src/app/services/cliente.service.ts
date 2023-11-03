import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../Models/cliente';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    baseUrl: String = environment.baseUrl;

    constructor(
        private http: HttpClient,
        private snack: MatSnackBar) { }

    findAll(): Observable<Cliente[]> {
        const uri = this.baseUrl + "/clientes";
        return this.http.get<Cliente[]>(uri);
    }

    findById(id: any): Observable<Cliente> {
        const url = `${this.baseUrl}/clientes/${id}`;
        return this.http.get<Cliente>(url);
    }

    create(cliente: Cliente): Observable<Cliente> {
        const url = this.baseUrl + "/clientes";
        return this.http.post<Cliente>(url, cliente);
    }

    update(cliente: Cliente): Observable<Cliente> {
        const url = `${this.baseUrl}/clientes/${cliente.id}`;
        return this.http.put<Cliente>(url, cliente);
    }

    delete(id: any): Observable<void> {
        const url = `${this.baseUrl}/clientes/${id}`;
        return this.http.delete<void>(url);
    }

    massage(msg: String): void {
        this.snack.open(`${msg}`, 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 4000
        })
    }

}