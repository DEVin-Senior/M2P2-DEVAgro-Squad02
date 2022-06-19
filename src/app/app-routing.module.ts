import { GrainEditGuard } from './_auth/grain/grain-edit.guard';
import { EmployeeEditGuard } from './_auth/employee/employee-edit.guard';
import { GeneralGuard } from './_auth/general.guard';
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
import { GrainListComponent } from './_components/grain/grain-list/grain-list.component';
import { GrainEditComponent } from './_views/grain/grain-edit/grain-edit.component';
import { EmployeeEditComponent } from './_components/employee/employee-edit/employee-edit/employee-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [GeneralGuard]},
  { path: 'signin', component: CompanyFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'farm/form', component: FarmFormComponent, canActivate: [GeneralGuard] },
  { path: 'farm/list', component: FarmListComponent, canActivate: [GeneralGuard] },
  { path: 'employee/form', component: EmployeeFormComponent, canActivate: [GeneralGuard] },
  { path: 'home', component: HomeComponent, canActivate: [GeneralGuard] },
  { path: 'employee/list', component: ShowWorkerComponent, canActivate: [GeneralGuard] },
  { path: 'employee/edit/:id', component: EmployeeEditComponent, canActivate: [EmployeeEditGuard] },
  { path: 'grain/list', component: GrainListComponent, canActivate: [GeneralGuard] },
  { path: 'grain/form', component: GrainFormComponent, canActivate: [GeneralGuard] },
  { path: 'grain/edit/:id', component: GrainEditComponent, canActivate: [GrainEditGuard] },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
