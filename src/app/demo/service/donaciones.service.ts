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

  //Donaciones
  getDonaciones(): Observable<any[]> {
    return this.http.get<any>(this.HCMasterURL + '/Donaciones');
  }

  deleteDonaciones(id: number): Observable<any[]> {
    return this.http.delete<any>(this.HCMasterURL + `/Donaciones/${id}`);
  }

  addDonaciones(dona: Donaciones): Observable<any[]> {
    const { donanteNombre, cantidadDonada, fecha, proyectoId } = dona;

    return this.http.post<any>(this.HCMasterURL + `/Donaciones`, {
      "donanteNombre": donanteNombre,
      "cantidaddonada": cantidadDonada,
      "fecha": fecha,
      "proyectoId": proyectoId
    }
    )
  }

  editDonaciones(dona: Donaciones): Observable<any[]> {
    const { id, donanteNombre, cantidadDonada, fecha, proyectoId  } = dona;

    return this.http.put<any>(this.HCMasterURL + `/Donaciones/${id}`, {
      "id":id,
      "donanteNombre": donanteNombre,
      "cantidaddonada": cantidadDonada,
      "fecha": fecha,
      "proyectoId": proyectoId
    }
    )
  }
}
