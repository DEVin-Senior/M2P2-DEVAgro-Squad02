import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grain-form',
  templateUrl: './grain-form.component.html',
  styleUrls: ['./grain-form.component.css']
})
export class GrainFormComponent implements OnInit {

  btnName: string = 'CADASTRAR';
  
  constructor() { }

  ngOnInit(): void {
  }

}
