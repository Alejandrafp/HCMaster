import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Actividad {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fechaHora: string;
  voluntariosRequeridos: number;
  organizacionId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }

  obtenerActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.HCMasterURL}/ActividadesVoluntariado`);
  }

  agregarActividad(actividad: Actividad): Observable<any> {
    return this.http.post(`${this.HCMasterURL}/ActividadesVoluntariado`, actividad);
  }

  editarActividad(actividad: Actividad): Observable<any> {
    return this.http.put(`${this.HCMasterURL}/ActividadesVoluntariado/${actividad.id}`, actividad);
  }

  eliminarActividad(id: number): Observable<any> {
    return this.http.delete(`${this.HCMasterURL}/ActividadesVoluntariado/${id}`);
  }
}
