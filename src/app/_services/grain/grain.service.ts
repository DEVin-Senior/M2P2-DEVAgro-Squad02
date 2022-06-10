<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IGrain } from 'src/app/_interfaces/grain/grain';
=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE } from 'src/environments/environment';
>>>>>>> c5cc24c90d2803ea5222d43a231920ebf54e1939

@Injectable({
  providedIn: 'root'
})
export class GrainService {

<<<<<<< HEAD
  apiUrl = 'https://m2p2-devagro-squad02-backend.herokuapp.com/grain';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public postGrain(grain: any): Observable<IGrain> {
    return this.httpClient.post<any>(this.apiUrl, grain, this.httpOptions);
=======
  constructor(private http: HttpClient) { }

  getAllGrains(){
    return this.http.get(`${API_BASE}/grain/list`);
>>>>>>> c5cc24c90d2803ea5222d43a231920ebf54e1939
  }
}
