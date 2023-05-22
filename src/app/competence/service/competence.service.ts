import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competence } from '../api/competence';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private http: HttpClient) { }

  getCompetences() {
    return this.http.get<any>('assets/mockup/data/competences.json')
        .toPromise()
        .then(res => res.data as Competence[])
        .then(data => data);
}
}
