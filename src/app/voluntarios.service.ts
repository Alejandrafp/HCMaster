import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoluntariosService {
  private apiUrl = 'API'; //  aqui va el API t.t

  constructor(private http: HttpClient) { }

  obtenerVoluntarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/voluntarios`);
  }

  crearVoluntario(voluntario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/voluntarios`, voluntario);
  }

  actualizarVoluntario(id: number, voluntario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/voluntarios/${id}`, voluntario);
  }

  eliminarVoluntario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/voluntarios/${id}`);
  }
}
