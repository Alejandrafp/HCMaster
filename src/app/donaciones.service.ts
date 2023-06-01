import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonacionesService {
  private apiUrl = '';

  constructor(private http: HttpClient) { }

  getDonaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/donaciones`);
  }

  getDonacion(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/donaciones/${id}`);
  }

  createDonacion(donacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/donaciones`, donacion);
  }

  updateDonacion(id: number, donacion: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/donaciones/${id}`, donacion);
  }

  deleteDonacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/donaciones/${id}`);
  }
}
