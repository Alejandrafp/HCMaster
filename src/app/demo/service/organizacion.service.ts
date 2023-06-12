import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organizacion } from '../api/organizacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }

  //Organizaciones
  getOrganizaciones(): Observable<any[]> {
    return this.http.get<any>(this.HCMasterURL + '/Organizaciones');
  }

  deleteOrganizaciones(id: number): Observable<any[]> {
    return this.http.delete<any>(this.HCMasterURL + `/Organizaciones/${id}`);
  }

  addOrganizaciones(organizaciones: Organizacion): Observable<any> {
    const { name, address, email, phone, description } = organizaciones;

    return this.http.post<any>(this.HCMasterURL + `/Organizaciones`, {
      "nombre": name,
      "direccion": address,
      "correoElectronico": email,
      "telefono": phone,
      "descripcion": description,
      "actividadesVoluntariado": [],
      "proyectos": []
    }
    )
  }

  editOrganizacion(organizacion: Organizacion): Observable<any> {
    const { id, name, address, email, phone, description } = organizacion;

    return this.http.put<any>(this.HCMasterURL + `/Organizaciones/${id}`, {
      "id": id,
      "nombre": name,
      "direccion": address,
      "correoElectronico": email,
      "telefono": phone,
      "descripcion": address,
      "actividadesVoluntariado": [],
      "proyectos": []
    }
    )
  }
}
