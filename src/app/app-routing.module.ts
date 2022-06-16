import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_views/login/login.component';
import { CompanyFormComponent } from './_views/company-form/company-form.component';
import { FarmFormComponent } from './_views/farm/farm-form/farm-form.component';
import { FarmListComponent } from './_views/farm/farm-list/farm-list.component';
import { EmployeeFormComponent } from './_views/employee/employee-form/employee-form.component';
import { HomeComponent } from './_views/home/home/home.component';
import { Error404Component } from './_views/error404/error404.component';
import { GrainFormComponent } from './_views/grain/grain-form/grain-form.component';
import { GrainListComponent } from './_views/grain/grain-list/grain-list.component';
import { GrainEditComponent } from './_views/grain/grain-edit/grain-edit/grain-edit.component';
import { EmployeeEditComponent } from './_views/employee/employee-edit/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './_views/employee/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'company/form', component: CompanyFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'farm/form', component: FarmFormComponent },
  { path: 'farm/list', component: FarmListComponent },
  { path: 'employee/form', component: EmployeeFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'employee/list', component: EmployeeListComponent },
  { path: 'employee/edit/:id', component: EmployeeEditComponent },
  { path: 'grain/list', component: GrainListComponent },
  { path: 'grain/form', component: GrainFormComponent },
  { path: 'grain/edit', component: GrainEditComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
