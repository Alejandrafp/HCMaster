import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes } from '../../demo/api/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }

  getClientes(): Observable<any[]> {
    return this.http.get<any>(this.HCMasterURL + '/ClientesPotenciales');
  }

  deleteClientes(id: number): Observable<any[]> {
    return this.http.delete<any>(this.HCMasterURL + `/ClientesPotenciales/${id}`);
  }

  addClientes(clientes: Clientes): Observable<any[]> {
    const { name , age, gender, location, preferences, behavior} = clientes;

    return this.http.post<any>(this.HCMasterURL + `/ClientesPotenciales`, {
        "nombre": name,
        "edad": age,
        "genero": gender,
        "ubicacion": location,
        "preferenciasCompra": preferences,
        "comportamientoLinea": behavior,
        "encuestasComentariosClientes": []
    }
    )
  }

  editClientes(clientes: Clientes): Observable<any[]> {
    const { id, name, age, gender, location, preferences, behavior} = clientes;

    return this.http.put<any>(this.HCMasterURL + `/ClientesPotenciales/${id}`, {
        "id": id,
        "nombre": name,
        "edad": age,
        "genero": gender,
        "ubicacion": location,
        "preferenciasCompra": preferences,
        "comportamientoLinea": behavior,
        "encuestasComentariosClientes": []
    }
    )
  }
}
