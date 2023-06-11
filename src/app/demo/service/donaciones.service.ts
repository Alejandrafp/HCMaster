import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donaciones } from '../../demo/api/donaciones';

@Injectable({
  providedIn: 'root'
})
export class DonacionesService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }

  getDonaciones(): Observable<any[]> {
    return this.http.get<any>(this.HCMasterURL + '/Donaciones');
  }

  deleteDonaciones(id: number): Observable<any[]> {
    return this.http.delete<any>(this.HCMasterURL + `/Donaciones/${id}`);
  }

  addDonaciones(donaciones: Donaciones): Observable<any> {
    const { nameDonor, quantityDonnor, date, projectId } = donaciones;

    return this.http.post<any>(this.HCMasterURL + `/Donaciones`, {
        "donanteNombre": nameDonor,
        "cantidadDonada": quantityDonnor,
        "fecha": date,
        "proyectoId": projectId
      }
    )
  }

  editDonaciones(donaciones: Donaciones): Observable<any> {
    const { id, nameDonor, quantityDonnor, date, projectId } = donaciones;

    return this.http.put<any>(this.HCMasterURL + `/Donaciones/${id}`, {
        "id": id,
        "donanteNombre": nameDonor,
        "cantidadDonada": quantityDonnor,
        "fecha": date,
        "proyectoId": projectId
      }
    )
  }
}
