import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent implements OnInit {

  @Input() menuName: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}