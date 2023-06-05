import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donacion } from './donacion.model';

@Injectable({
  providedIn: 'root'
})
export class DonacionesService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }

  getDonaciones(): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(`${this.HCMasterURL}/donaciones`);
  }

  getDonacion(id: number): Observable<Donacion> {
    return this.http.get<Donacion>(`${this.HCMasterURL}/donaciones/${id}`);
  }

  createDonacion(donacion: Donacion): Observable<Donacion> {
    return this.http.post<Donacion>(`${this.HCMasterURL}/donaciones`, donacion);
  }

  updateDonacion(donacion: Donacion): Observable<Donacion> {
    return this.http.put<Donacion>(`${this.HCMasterURL}/donaciones/${donacion.id}`, donacion);
  }

  deleteDonacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.HCMasterURL}/donaciones/${id}`);
  }
}
