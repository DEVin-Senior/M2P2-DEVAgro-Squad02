import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  @ViewChild('homeItem') homeItem!: ElementRef;
  @ViewChild('employeeItem') employeeItem!: ElementRef;
  @ViewChild('farmItem') farmItem!: ElementRef;
  @ViewChild('grainItem') grainItem!: ElementRef;
  @ViewChild('logout') logout!: ElementRef;

  url: string = '';

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    this.check();
  }

  ngOnInit(): void {

  }

  check() {
    this.url = this.router.url;
    if (this.url.includes('farm')) {
      this.farmItem.nativeElement.classList.add('is-clicked');
    } else if (this.url.includes('employee')) {
      this.employeeItem.nativeElement.classList.add('is-clicked');
    } else if (this.url.includes('grain')) {
      this.grainItem.nativeElement.classList.add('is-clicked');
    } else if (this.url.includes('logout')) {
      this.grainItem.nativeElement.classList.add('is-clicked');
    }
    else {
      this.homeItem.nativeElement.classList.add('is-clicked');
    }
  }

  logoutUser() {
    try {
      localStorage.removeItem('companyId');
      localStorage.removeItem('user');
      this.router.navigate(['login'])
    } catch (error) {
      //TO DO caso necessário
    }
  }

}
