import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { informe } from '../api/informe';

@Injectable({
  providedIn: 'root'
})
export class informeService {

  constructor(private http: HttpClient) { }

  getinformes() {
    return this.http.get<any>('assets/mockup/data/informes.json')
        .toPromise()
        .then(res => res.data as informe[])
        .then(data => data);
}
}
