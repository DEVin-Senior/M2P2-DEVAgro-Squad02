import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_views/login/login.component';
import { CompanyFormComponent } from './_views/company-form/company-form.component';
import { FarmFormComponent } from './_components/farm/farm-form/farm-form.component';
import { FarmListComponent } from './_components/farm/farm-list/farm-list.component';
import { EmployeeFormComponent } from './_components/employee/employee-form/employee-form.component';

const routes: Routes = [
  { path: 'company/company-form', component: CompanyFormComponent },
  { path: 'login', component: LoginComponent },
  { path: "farm/farm-form", component: FarmFormComponent },
  { path: "farm/farm-list", component: FarmListComponent },
  { path: "employee/employee-form", component: EmployeeFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
