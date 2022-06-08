import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-farm-form',
  templateUrl: './farm-form.component.html',
  styleUrls: ['./farm-form.component.css']
})
export class FarmFormComponent implements OnInit {

  btnName:string = 'CADASTRAR';

  constructor() { }

  ngOnInit(): void {
  }

}
