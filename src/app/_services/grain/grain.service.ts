import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IGrain } from 'src/app/_interfaces/grain/grain';

@Injectable({
  providedIn: 'root'
})
export class GrainService {

  apiUrl = 'https://m2p2-devagro-squad02-backend.herokuapp.com/grain';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public postGrain(grain: any): Observable<IGrain> {
    return this.httpClient.post<any>(this.apiUrl, grain, this.httpOptions);
  }
}
