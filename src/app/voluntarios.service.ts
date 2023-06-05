import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voluntario } from './voluntarios/voluntario.model';

@Injectable({
  providedIn: 'root'
})
export class VoluntariosService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }

  obtenerVoluntarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.HCMasterURL}/voluntarios`);
  }

  crearVoluntario(voluntario: any): Observable<any> {
    return this.http.post<any>(`${this.HCMasterURL}/voluntarios`, voluntario);
  }

  actualizarVoluntario(id: number, voluntario: any): Observable<any> {
    return this.http.put<any>(`${this.HCMasterURL}/voluntarios/${id}`, voluntario);
  }

  eliminarVoluntario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.HCMasterURL}/voluntarios/${id}`);
  }
}
