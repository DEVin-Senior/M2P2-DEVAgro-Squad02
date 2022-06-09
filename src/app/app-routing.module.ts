import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CompanyFormComponent } from './_components/company/company-form/company-form.component';
import { FarmFormComponent } from './_components/farm/farm-form/farm-form.component';
import { FarmListComponent } from './_components/farm/farm-list/farm-list.component';
import { ShowWorkerComponent } from './_components/show-worker/show-worker.component';

const routes: Routes = [
  { path: 'company/company-form', component: CompanyFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'farm/farm-form', component: FarmFormComponent },
  { path: 'farm/list', component: FarmListComponent },
  { path: 'employee/list', component: ShowWorkerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
