import { Injectable } from '@angular/core';
import { Marketing } from '../api/marketing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketingService {

  url = 'https://localhost:7036/api/';

  constructor(private http: HttpClient) { }

  createMarketing(marketing: Marketing) {
    let headers = new HttpHeaders();
    let body = JSON.stringify(marketing);
    alert(body)
    //headers.append("accept", "text/plain");
    headers.append("Content-Type", "application/json");
    this.http.post("https://localhost:7036/api/CanalesMarketings",body,{headers:headers});
  }

  getMarketings() {
    this.http.get<any>("https://localhost:7036/api/CanalesMarketings")
    .toPromise()
    .then(res => res.data as Marketing[])
    .then(data => console.log("data",data));
  }

  deleteMarketing(id:number) {
    this.http.delete<any>("https://localhost:7036/api/CanalesMarketings/"+id)
    .toPromise();
  }


}
