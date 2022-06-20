import { GrainService } from 'src/app/_services/grain/grain.service';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router,
    private employeeService: EmployeeService,
    private grainService: GrainService) { }

  isLogged() {
    if (localStorage.getItem('user') != null) {
      return true;
    }

    this.route.navigate(['/login']);
    return false;
  }

  async isEmployeeFromCompany(id: string) {
    let employeeExists: boolean = false;

    await this.employeeService.getEmployeeFromCompany(id).then(
      (res: any) => res != null ? employeeExists = true : employeeExists = false
    );
    this.employeeService.getEmployeeFromCompany(id);


    if (employeeExists == false) {
      this.route.navigate(['employee/list'])
      return false;
    }

    return true;
  }

  async isGrainFromCompany(id: string) {
    let grainExists: boolean = false;

    await this.grainService.getGrainFromCompany(id).then(
      (res: any) => res != null ? grainExists = true : grainExists = false
    );
    this.grainService.getGrainFromCompany(id);

    if (grainExists == false) {
      this.route.navigate(['grain/list'])
      return false;
    }

    return true;
  }
}
