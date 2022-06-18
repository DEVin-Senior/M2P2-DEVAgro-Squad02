import { Component, Input, OnInit } from '@angular/core';
import { ICompany } from 'src/app/_interfaces/company/icompany';
import { CompanyService } from 'src/app/_services/company/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent implements OnInit {

  @Input() menuName: string = "";
  companyIdFromCurrentUser = localStorage.getItem('companyId');
  companyFromCurrentUser: ICompany = {
    id: "",
    name: "",
    cnpj: "",
    address: "",
    email: "",
    password: ""
  };

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.getCompanyNameById();
  }

  getCompanyNameById() {
    this.companyService.getCompanyByIdFromCurrentUser().subscribe((data: any) => {
      this.companyFromCurrentUser = data.find((company: any) => company.id == this.companyIdFromCurrentUser);
    });
  }

  getCompanyName(): string {
    return this.companyFromCurrentUser.name;
  }

}
