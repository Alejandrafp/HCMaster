import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyectos } from '../api/proyectos';

@Injectable({
    providedIn: 'root'
  })
export class ProyectosService {

    constructor(private http: HttpClient) { }
    
      getProyectos() {
        return this.http.get<any>('assets/demo/data/proyectos.json')
            .toPromise()
            .then(res => res.data as Proyectos[])
            .then(data => data);
    }
    }