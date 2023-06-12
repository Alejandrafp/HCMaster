import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voluntarios } from '../../demo/api/voluntarios';

@Injectable({
  providedIn: 'root'
})
export class VoluntariosService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }

  //Voluntarios
  getVoluntarios(): Observable<any[]> {
    return this.http.get<any>(this.HCMasterURL + '/Voluntarios');
  }

  deleteVoluntarios(id: number): Observable<any[]> {
    return this.http.delete<any>(this.HCMasterURL + `/Voluntarios/${id}`);
  }

  addVoluntarios(volu: Voluntarios): Observable<any[]> {
    const { nombre, apellido, correoElectronico, descripcion, habilidades, actividadVoluntariadoId} = volu;

    return this.http.post<any>(this.HCMasterURL + `/Voluntarios`, {
      "nombre": nombre,
      "apellido": apellido,
      "correoElectronico": correoElectronico,
      "descripcion": descripcion,
      "habilidades": habilidades,
      "actividadVoluntariadoId": actividadVoluntariadoId
      
    }
    )
  }

  editVoluntarios(volu: Voluntarios): Observable<any[]> {
    const { id, nombre, apellido, correoElectronico, descripcion, habilidades, actividadVoluntariadoId } = volu;

    return this.http.put<any>(this.HCMasterURL + `/Voluntarios/${id}`, {
      "id":id,
      "nombre": nombre,
      "apellido": apellido,
      "correoElectronico": correoElectronico,
      "descripcion": descripcion,
      "habilidades": habilidades,
      "actividadVoluntariadoId": actividadVoluntariadoId
      
    }
    )
  }
}
