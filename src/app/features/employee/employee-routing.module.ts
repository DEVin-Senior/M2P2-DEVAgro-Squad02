import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { GeneralGuard } from './../../_auth/general.guard';
import { EmployeeEditGuard } from './../../_auth/employee/employee-edit.guard';
import { EmployeeEditComponent } from './employee-edit/employee-edit/employee-edit.component';
import { ShowWorkerComponent } from './../../_components/show-worker/show-worker.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'employee/list', component: ShowWorkerComponent, canActivate: [GeneralGuard] },
  { path: 'employee/edit/:id', component: EmployeeEditComponent, canActivate: [EmployeeEditGuard] },
  { path: 'employee/form', component: EmployeeFormComponent, canActivate: [GeneralGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
