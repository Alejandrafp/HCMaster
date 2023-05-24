import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cliente } from '../api/cliente';

@Injectable({
  providedIn: 'root'
})
export class clienteService {

  constructor(private http: HttpClient) { }

  getclientess() {
    return this.http.get<any>('assets/mockup/data/clientess.json')
        .toPromise()
        .then(res => res.data as cliente[])
        .then(data => data);
}
}
