import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../demo/api/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }

  //Usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any>(this.HCMasterURL + '/Usuarios');
  }

  deleteUsuario(id: number): Observable<any[]> {
    return this.http.delete<any>(this.HCMasterURL + `/Usuarios/${id}`);
  }

  addUsuario(usuario: Usuario): Observable<any[]> {
    const { name, lastname, email, password, phone, address } = usuario;

    return this.http.post<any>(this.HCMasterURL + `/Usuarios`, {
      "nombre": name,
      "apellido": lastname,
      "correoElectronico": email,
      "contrasena": password,
      "telefono": phone,
      "direccion": address,
      "informesAnalisis": []
    }
    )
  }

  editUsuario(usuario: Usuario): Observable<any[]> {
    const { id, name, lastname, email, password, phone, address } = usuario;

    return this.http.put<any>(this.HCMasterURL + `/Usuarios/${id}`, {
      "id":id,
      "nombre": name,
      "apellido": lastname,
      "correoElectronico": email,
      "contrasena": password,
      "telefono": phone,
      "direccion": address,
      "informesAnalisis": []
    }
    )
  }
}
