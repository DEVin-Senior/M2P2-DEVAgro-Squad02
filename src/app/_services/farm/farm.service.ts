import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFarm } from 'src/app/_interfaces/farm/ifarm';
import { API_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor(private http: HttpClient) { }

  saveFarm(farm: IFarm){
    return this.http.post<IFarm>(`${API_BASE}/farm`, farm).toPromise();
  }
}
