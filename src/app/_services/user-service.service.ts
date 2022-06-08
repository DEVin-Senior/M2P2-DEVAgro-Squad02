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
          console.log(res);

          this.isCorrect = res.some((user: any) => user.email === email && user.password === password)
        }
      );
    console.log(this.isCorrect);

    return this.isCorrect;




  }
}
