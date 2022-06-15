import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  btnName:string = 'ALTERAR';
  menuName: string = 'Funcionário';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {}
}
