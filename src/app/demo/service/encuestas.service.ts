import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encuestas } from '../../demo/api/encuestas';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }

  getEncuestas(): Observable<any[]> {
    return this.http.get<any>(this.HCMasterURL + '/EncuestasComentariosClientes');
  }

  deleteEncuestas(id: number): Observable<any[]> {
    return this.http.delete<any>(this.HCMasterURL + `/EncuestasComentariosClientes/${id}`);
  }

  addEncuestas(encuestas: Encuestas): Observable<any[]> {
    const { customerId, opinion, suggestions, complaints, date  } = encuestas;

    return this.http.post<any>(this.HCMasterURL + `/EncuestasComentariosClientes`, {
        "clienteId": customerId,
        "opinion": opinion,
        "sugerencias": suggestions,
        "quejas": complaints,
        "fecha": date
      }
    )
  }

  editEncuestas(encuestas: Encuestas): Observable<any[]> {
    const { id, customerId, opinion, suggestions, complaints, date  } = encuestas;

    return this.http.put<any>(this.HCMasterURL + `/EncuestasComentariosClientes/${id}`, {
        "id": id,
        "clienteId": customerId,
        "opinion": opinion,
        "sugerencias": suggestions,
        "quejas": complaints,
        "fecha": date
      }
    )
  }
}
