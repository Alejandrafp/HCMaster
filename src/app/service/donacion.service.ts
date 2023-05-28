import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donacion } from '../donacion.model';

@Injectable({
  providedIn: 'root'
})
export class DonacionesService {
  private apiUrl = 'https://localhost:7036/HCApi'; 

  constructor(private http: HttpClient) { }

  public getDonaciones(): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(`${this.apiUrl}/donaciones`);
  }

  public getDonacion(id: number): Observable<Donacion> {
    return this.http.get<Donacion>(`${this.apiUrl}/donaciones/${id}`);
  }

  public crearDonacion(donacion: Donacion): Observable<Donacion> {
    return this.http.post<Donacion>(`${this.apiUrl}/donaciones`, donacion);
  }

  public actualizarDonacion(id: number, donacion: Donacion): Observable<Donacion> {
    return this.http.put<Donacion>(`${this.apiUrl}/donaciones/${id}`, donacion);
  }

  public eliminarDonacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/donaciones/${id}`);
  }
}
