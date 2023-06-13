import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competence } from '../api/competence';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private http: HttpClient) { }

  getCompetences() {
    return this.http.get<any>('https://localhost:7036/api/Competencias')
        .toPromise()
        .then(res => res.data as Competence[])
        .then(data => data);
  }

  getCompetence(id:number) {
    return this.http.get<any>("https://localhost:7036/api/Competencias"+id)
        .toPromise()
        .then(res => res.data as Competence)
        .then(data => data);
  }

  deleteCompetence(id:number){
    this.http.delete<any>("https://localhost:7036/api/Competencias"+id)
        .toPromise();
  }

  saveCompetence(competence:Competence){
    let headers = new HttpHeaders();
    let body = JSON.stringify(competence);

    //headers.append("accept", "text/plain");
    headers.append("Content-Type", "application/json");
    return this.http.post<any>('https://localhost:7036/api/Competencias',body,{headers:headers})
        .toPromise();
  }
}
