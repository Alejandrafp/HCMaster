import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marketing } from '../api/marketing';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketingService {
  readonly HCMasterURL = "https://localhost:7036/api"

  constructor(private http: HttpClient) { }
  
  getMarketing(): Observable<any[]> {
    return this.http.get<any>(this.HCMasterURL + '/CanalesMarketings');
  }

  deleteMarketing(id: number): Observable<any[]> {
    return this.http.delete<any>(this.HCMasterURL + `/CanalesMarketings/${id}`);
  }

  addMarketing(marketing: Marketing): Observable<any[]> {
    const { channel } = marketing;

    return this.http.post<any>(this.HCMasterURL + `/CanalesMarketings`, {
        "canal": channel,
        "competencia": []
    }
    )
  }

  editMarketing(marketing: Marketing): Observable<any[]> {
    const { id, channel } = marketing;

    return this.http.put<any>(this.HCMasterURL + `/CanalesMarketings/${id}`, {
      "id": id,
      "canal": channel,
      "competencia": []
    }
    )
  }
}
