import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFarm } from 'src/app/_interfaces/farm/ifarm';
import { API_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  constructor(private http: HttpClient) {}

  saveFarm(farm: IFarm): Observable<IFarm> {
    return this.http.post<IFarm>(`${API_BASE}/farm`, farm);
  }

  getAllfarm() {
    return this.http.get(`${API_BASE}/farm/list`);
  }

}
