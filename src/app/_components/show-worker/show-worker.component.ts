import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../../_services/employee/employee.service';

@Component({
  selector: 'app-show-worker',
  templateUrl: './show-worker.component.html',
  styleUrls: ['./show-worker.component.css'],
})
export class ShowWorkerComponent implements OnInit {

  employees: any;
  hasEmployee: boolean = false;

  constructor(private service: EmployeeService) { }

  ngOnInit(): void {
    this.getByCompany();
  }

  async getByCompany() {
    const companyId = localStorage.getItem('companyId');

    if (companyId != null) {
      await this.service.getByCompanyId(companyId).then(res => this.employees = res);
      this.hasEmployee = this.employees.length > 0;
    } else {
      this.employees = [];
      this.hasEmployee = false;
    }
  }


}
