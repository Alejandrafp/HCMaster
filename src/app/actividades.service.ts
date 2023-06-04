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
    return this.http.get<Actividad[]>(`${this.HCMasterURL}/actividades`);
  }

  agregarActividad(actividad: Actividad): Observable<any> {
    return this.http.post(`${this.HCMasterURL}/actividades`, actividad);
  }

  editarActividad(actividad: Actividad): Observable<any> {
    return this.http.put(`${this.HCMasterURL}/actividades/${actividad.id}`, actividad);
  }

  eliminarActividad(id: number): Observable<any> {
    return this.http.delete(`${this.HCMasterURL}/actividades/${id}`);
  }
}
