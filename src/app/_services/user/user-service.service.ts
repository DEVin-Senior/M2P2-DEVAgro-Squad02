import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  isCorrect: boolean = false;

  constructor(private http: HttpClient) { }

  verifyUser(email: string, password: string): boolean {
    this.http.get("https://m2p2-devagro-squad02-backend.herokuapp.com/company/list")
      .subscribe(
        (res: any) => {
          this.isCorrect = res.some((user: any) => user.email === email && user.password === password)
        }
      );
    return this.isCorrect;
  }
}
