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

<<<<<<< Updated upstream
=======
  getAmountfarmCompanyLoggedIn(idCompany: any) {
    return this.http.get(`${API_BASE}/farm/quantity-by-company?companyId=${idCompany}`);
  }

  getAllgrainCompanyLoggedIn(idCompany: any) {
    return this.http.get<IGrainCompanyLoggedIn>(`${API_BASE}/farm/list-grain-stock-by-company?companyId=${idCompany}`);
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

  putFarm(farm: IFarm, farmProducesId: any){    
    return this.http.put<IFarm>(`${API_BASE}/farm/${farmProducesId}`, farm);
  }

>>>>>>> Stashed changes
}
