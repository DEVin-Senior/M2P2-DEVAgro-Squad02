import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrainService {

  constructor(private http: HttpClient) { }

  getAllGrains(){
    return this.http.get(`${API_BASE}/grain/list`);
  }
}
