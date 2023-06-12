import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tendencias } from '../../demo/api/tendencias';

@Injectable({
  providedIn: 'root'
})
export class TendenciasService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }

  //Usuarios
  getTendencias(): Observable<any[]> {
    return this.http.get<any>(this.HCMasterURL + '/TendenciasMercados');
  }

  deleteTendencias(id: number): Observable<any[]> {
    return this.http.delete<any>(this.HCMasterURL + `/TendenciasMercados/${id}`);
  }

  addTendencias(tendencias: Tendencias): Observable<any> {
    const { marketsize, growth, opportunities, threats, competitionId } = tendencias;

    return this.http.post<any>(this.HCMasterURL + `/TendenciasMercados`, {
        "tamanoMercado": marketsize,
        "crecimientoMercado": growth,
        "oportunidadesCrecimiento": opportunities,
        "amenazas": threats,
        "competenciaId": competitionId
    }
    )
  }

  editTendencias(tendencias: Tendencias): Observable<any> {
    const { id, marketsize, growth, opportunities, threats, competitionId } = tendencias;

    return this.http.put<any>(this.HCMasterURL + `/TendenciasMercados/${id}`, {
        "id":id,
        "tamanoMercado": marketsize,
        "crecimientoMercado": growth,
        "oportunidadesCrecimiento": opportunities,
        "amenazas": threats,
        "competenciaId": competitionId
    }
    )
  }
}
