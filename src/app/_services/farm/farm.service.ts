import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';
import { IFarm } from 'src/app/_interfaces/farm/ifarm';
import { IFarmNextHarvest } from 'src/app/_interfaces/farm/ifarm-next-harvest';
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

  getAllFarmsByCompany(companyId: string | null){
    if(companyId == null) {
      throw Error("O id da empresa do usuário logado não foi encontrado.")
    }
    return this.http.get(`${API_BASE}/farm/farms-by-company?companyId=${companyId}`);
  }

  getNextHarvestByCompany(companyId: string | null): Observable<IFarmNextHarvest[]> {
    if(companyId == null) {
      throw Error("O id da empresa do usuário logado não foi encontrado.")
    }
    return this.http.get<IFarmNextHarvest[]>(`${API_BASE}/farm/list-farm-next-harvest?companyId=${companyId}`);
  }

}
