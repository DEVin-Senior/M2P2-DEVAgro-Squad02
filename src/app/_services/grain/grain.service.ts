import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE } from 'src/environments/environment';
import { IGrain } from 'src/app/_interfaces/grain/grain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrainService {

  constructor(private http: HttpClient) { }

  getAllGrains() {
    return this.http.get(`${API_BASE}/grain/list`);
  }

  public postGrain(grain: any): Observable<IGrain> {
    return this.http.post<any>(`${API_BASE}/grain`, grain);
  }
}