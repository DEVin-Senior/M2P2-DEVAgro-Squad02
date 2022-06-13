import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_views/login/login.component';
import { CompanyFormComponent } from './_views/company-form/company-form.component';
import { FarmFormComponent } from './_components/farm/farm-form/farm-form.component';
import { FarmListComponent } from './_components/farm/farm-list/farm-list.component';
import { HomeComponent } from './_components/home/home/home.component';
import { ShowWorkerComponent } from './_components/show-worker/show-worker.component';
import { GrainsQueryComponent } from './_components/grain/grains-query/grains-query.component';

const routes: Routes = [
  { path: 'company/company-form', component: CompanyFormComponent },
  { path: 'login', component: LoginComponent },
  { path: "farm/farm-form", component: FarmFormComponent },
  { path: "farm/farm-list", component: FarmListComponent },
  { path: "grain/grain-list", component: GrainsQueryComponent},
  { path: "home", component: HomeComponent },
  { path: 'employee/list', component: ShowWorkerComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
