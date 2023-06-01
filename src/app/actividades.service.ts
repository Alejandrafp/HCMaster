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
  private apiUrl = 'API'; // Aqui va el api t.t

  constructor(private http: HttpClient) { }

  obtenerActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.apiUrl}/actividades`);
  }

  agregarActividad(actividad: Actividad): Observable<any> {
    return this.http.post(`${this.apiUrl}/actividades`, actividad);
  }

  editarActividad(actividad: Actividad): Observable<any> {
    return this.http.put(`${this.apiUrl}/actividades/${actividad.id}`, actividad);
  }

  eliminarActividad(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/actividades/${id}`);
  }
}
