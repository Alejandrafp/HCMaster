import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../api/usuario';

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService {

    constructor(private http: HttpClient) { }
    
      getUsuario() {
        return this.http.get<any>('assets/demo/data/usuario.json')
            .toPromise()
            .then(res => res.data as Usuario[])
            .then(data => data);
    }
    }