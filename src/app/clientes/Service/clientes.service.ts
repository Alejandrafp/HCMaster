import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { clientes } from '../api/clientes';

@Injectable({
  providedIn: 'root'
})
export class clientesService {

  constructor(private http: HttpClient) { }

  getclientess() {
    return this.http.get<any>('assets/mockup/data/clientess.json')
        .toPromise()
        .then(res => res.data as clientes[])
        .then(data => data);
}
}
