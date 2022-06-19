import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getRoute(){
    const company = localStorage.getItem('companyId');
    const email = localStorage.getItem('user');

    if(company == null || email == null){
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/home']);
    }
  }

}
