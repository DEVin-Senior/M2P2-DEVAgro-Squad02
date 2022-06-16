import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/_services/employee/employee.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {

  employees: any;
  hasEmployee: boolean = false;

  constructor(private service: EmployeeService) { }

  ngOnInit(): void {
    this.getByCompany();
  }

  async getByCompany() {
    const companyId = localStorage.getItem('companyId');

    if (companyId != null) {
      await this.service.getByCompanyId(parseInt(companyId)).then(res => this.employees = res);
      this.hasEmployee = this.employees.length > 0;
      console.log(this.employees);

    } else {
      this.employees = [];
      this.hasEmployee = false;
    }
  }


}
