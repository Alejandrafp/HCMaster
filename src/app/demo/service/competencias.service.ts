import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competencias } from '../../demo/api/competencias';

@Injectable({
  providedIn: 'root'
})
export class CompetenciasService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }

  getCompetencias(): Observable<any[]> {
    return this.http.get<any>(this.HCMasterURL + '/Competencias');
  }

  deleteCompetencias(id: number): Observable<any[]> {
    return this.http.delete<any>(this.HCMasterURL + `/Competencias/${id}`);
  }

  addCompetencias(competencias: Competencias): Observable<any> {
    const { name, product, strategies, analysisPrices, chanelId, channelMarketing} = competencias;

    return this.http.post<any>(this.HCMasterURL + `/Competencias`, {
        "nombre": name,
        "producto": product,
        "estrategiasMarketing": strategies,
        "analisisPrecios": analysisPrices,
        "canalMarketingId": chanelId,
        "canalMarketing": channelMarketing,
        "tendenciasMercado": []
    }
    )
  }

  editCompetencias(competencias: Competencias): Observable<any> {
    const { id, name, product, strategies, analysisPrices, chanelId, channelMarketing} = competencias;

    return this.http.put<any>(this.HCMasterURL + `/Competencias/${id}`, {
        "id": id,
        "nombre": name,
        "producto": product,
        "estrategiasMarketing": strategies,
        "analisisPrecios": analysisPrices,
        "canalMarketingId": chanelId,
        "canalMarketing": channelMarketing,
        "tendenciasMercado": []
    }
    )
  }
}