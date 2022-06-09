import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { API_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  isCorrect: boolean = false;
  companyId: number = 0;

  constructor(private http: HttpClient) {}

  verifyUser(email: string, password: string): boolean {
    this.http.get(`${API_BASE}/company/list`).subscribe((res: any) => {

      this.isCorrect = res.some(
        (user: any) => user.email === email && user.password === password
      );

      if (this.isCorrect) {
        this.companyId = res.find((user: any) => user.email == email).id;
        localStorage.setItem('companyId', this.companyId.toString());
      }

    });

    return this.isCorrect;
  }
}
