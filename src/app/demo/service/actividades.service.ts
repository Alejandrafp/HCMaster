import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActividadesVoluntariado } from '../../demo/api/activivolun';

@Injectable({
  providedIn: 'root'
})
export class ActividadesVoluntariadoService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }

  //Actividades
  getActividadesVoluntariado(): Observable<any[]> {
    return this.http.get<any>(this.HCMasterURL + '/ActividadesVoluntariados');
  }

  deleteActividadesVoluntariado(id: number): Observable<any[]> {
    return this.http.delete<any>(this.HCMasterURL + `/ActividadesVoluntariados/${id}`);
  }

  addActividadesVoluntariado(acti: ActividadesVoluntariado): Observable<any[]> {
    const { titulo, descripcion, ubicacion, fechaHora, voluntariosRequeridos, organizacionId } = acti;

    return this.http.post<any>(this.HCMasterURL + `/ActividadesVoluntariados`, {
      "titulo": titulo,
      "descripcion": descripcion,
      "ubicacion": ubicacion,
      "fechayHora": fechaHora,
      "voluntariosRequeridos": voluntariosRequeridos,
      "organizacionId": organizacionId
    }
    )
  }

  editActividadesVoluntariado(acti: ActividadesVoluntariado): Observable<any[]> {
    const {  id, titulo, descripcion, ubicacion, fechaHora, voluntariosRequeridos, organizacionId  } = acti;

    return this.http.put<any>(this.HCMasterURL + `/ActividadesVoluntariados/${id}`, {
      "titulo": titulo,
      "descripcion": descripcion,
      "ubicacion": ubicacion,
      "fechaHora": fechaHora,
      "voluntariosRequeridos": voluntariosRequeridos,
      "organizacionId": organizacionId
    }
    )
  }
}
