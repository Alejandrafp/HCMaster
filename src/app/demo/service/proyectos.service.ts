import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyectos } from '../api/proyectos';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class ProyectosService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }

  //Proyectos
  getProyectos(): Observable<any[]> {
    return this.http.get<any>(this.HCMasterURL + '/Proyectos');
  }

  deleteProyectos(id: number): Observable<any[]> {
    return this.http.delete<any>(this.HCMasterURL + `/Proyectos/${id}`);
  }

  addProyectos(proyecto: Proyectos): Observable<any> {
    const { title, location, category, startDate, endDate, budget, organizationID, organizationName } = proyecto;

    return this.http.post<any>(this.HCMasterURL + `/Proyectos`, {
      "titulo": title,
      // "descripcion": description,
      "ubicacion": location,
      "categoria": category,
      "fechaInicio": startDate,
      "fechaFinalizacion": endDate,
      "presupuesto": budget,
      "organizacionId": organizationID,
      "donaciones": [],
      "informesAnalisis": []
    }
    )
  }

  editProyectos(proyecto: Proyectos): Observable<any> {
    const { id, title, location, category, startDate, endDate, budget, organizationID, organizationName } = proyecto;

    return this.http.put<any>(this.HCMasterURL + `/Proyectos/${id}`, {
      "id":id,
      "titulo": title,
      // "descripcion": description,
      "ubicacion": location,
      "categoria": category,
      "fechaInicio": startDate,
      "fechaFinalizacion": endDate,
      "presupuesto": budget,
      "organizacionId": organizationID,
      "donaciones": [],
      "informesAnalisis": []
    }
    )
  }
}
