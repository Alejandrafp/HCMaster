import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoluntariosService {
  private apiUrl = 'https://localhost:7036/HCApi'; 

  constructor(private http: HttpClient) {}

  obtenerVoluntarios() {
    return this.http.get(this.apiUrl);
  }

  guardarVoluntario(voluntario: any) {
    return this.http.post(this.apiUrl, voluntario);
  }

  eliminarVoluntario(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
