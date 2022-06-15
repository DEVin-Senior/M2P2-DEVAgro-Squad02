import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_views/login/login.component';
import { CompanyFormComponent } from './_views/company-form/company-form.component';
import { FarmFormComponent } from './_components/farm/farm-form/farm-form.component';
import { FarmListComponent } from './_components/farm/farm-list/farm-list.component';
import { EmployeeFormComponent } from './_components/employee/employee-form/employee-form.component';
import { HomeComponent } from './_components/home/home/home.component';
import { ShowWorkerComponent } from './_components/show-worker/show-worker.component';
import { Error404Component } from './_views/error404/error404.component';
import { GrainFormComponent } from './_components/grain/grain-form/grain-form.component';
import { GrainsQueryComponent } from './_components/grain/grains-query/grains-query.component';

const routes: Routes = [
  { path: 'signin', component: CompanyFormComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'farm/form', component: FarmFormComponent },
  { path: 'farm/list', component: FarmListComponent },
  { path: 'employee/form', component: EmployeeFormComponent },
  { path: 'employee/list', component: ShowWorkerComponent },
  { path: 'grain/form', component: GrainFormComponent },
  { path: 'grain/list', component: GrainsQueryComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
