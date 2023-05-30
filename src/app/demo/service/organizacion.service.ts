import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organizacion } from '../api/organizacion';

@Injectable({
    providedIn: 'root'
  })
export class OrganizacionService {

    constructor(private http: HttpClient) { }
    
      getOrganizacion() {
        return this.http.get<any>('assets/demo/data/organizacion.json')
            .toPromise()
            .then(res => res.data as Organizacion[])
            .then(data => data);
    }
    }
