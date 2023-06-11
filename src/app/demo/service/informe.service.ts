import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Informe } from '../api/informe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformeService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }
  
  getInforme(): Observable<any[]> {
    return this.http.get<any>(this.HCMasterURL + '/InformesAnalisis');
  }

  deleteInforme(id: number): Observable<any[]> {
    return this.http.delete<any>(this.HCMasterURL + `/InformesAnalisis/${id}`);
  }

  addInforme(informe: Informe): Observable<any> {
    const { projectId, userId, totalDonations, volunteerHours } = informe;

    return this.http.post<any>(this.HCMasterURL + `/InformesAnalisis`, {
        "proyectoId": projectId,
        "usuarioId": userId,
        "donacionesTotales": totalDonations,
        "horasVoluntariado": volunteerHours     
     }
    )
  }

  editInforme(informe: Informe): Observable<any> {
    const { id, projectId, userId, totalDonations, volunteerHours } = informe;

    return this.http.put<any>(this.HCMasterURL + `/InformesAnalisis/${id}`, {
      "id": id,
      "proyectoId": projectId,
      "usuarioId": userId,
      "donacionesTotales": totalDonations,
      "horasVoluntariado": volunteerHours
    }
    )
  }
}
