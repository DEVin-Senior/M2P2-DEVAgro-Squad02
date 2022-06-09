import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grains-query',
  templateUrl: './grains-query.component.html',
  styleUrls: ['./grains-query.component.css']
})
export class GrainsQueryComponent implements OnInit {

  menuName: string = 'Grãos';

  constructor() { }

  ngOnInit(): void {
  }

}
