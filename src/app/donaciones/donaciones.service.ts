import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donacion } from './donacion.model';

@Injectable({
  providedIn: 'root'
})
export class DonacionesService {
  private apiUrl = 'API'; // aqui debe ir el api t.t

  constructor(private http: HttpClient) { }

  getDonaciones(): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(`${this.apiUrl}/donaciones`);
  }

  getDonacion(id: number): Observable<Donacion> {
    return this.http.get<Donacion>(`${this.apiUrl}/donaciones/${id}`);
  }

  createDonacion(donacion: Donacion): Observable<Donacion> {
    return this.http.post<Donacion>(`${this.apiUrl}/donaciones`, donacion);
  }

  updateDonacion(donacion: Donacion): Observable<Donacion> {
    return this.http.put<Donacion>(`${this.apiUrl}/donaciones/${donacion.id}`, donacion);
  }

  deleteDonacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/donaciones/${id}`);
  }
}
