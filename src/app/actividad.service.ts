import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from './actividad.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private apiUrl = 'https://localhost:7036/HCApi'; 
  constructor(private http: HttpClient) {}

  obtenerActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.apiUrl}/actividades`);
  }

  obtenerActividad(id: number): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.apiUrl}/actividades/${id}`);
  }

  crearActividad(actividad: Actividad): Observable<any> {
    return this.http.post(`${this.apiUrl}/actividades`, actividad);
  }

  actualizarActividad(actividad: Actividad): Observable<any> {
    return this.http.put(`${this.apiUrl}/actividades/${actividad.id}`, actividad);
  }

  eliminarActividad(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/actividades/${id}`);
  }
}
