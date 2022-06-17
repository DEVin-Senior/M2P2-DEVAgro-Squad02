import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

<<<<<<< refs/remotes/origin/task24
const routes: Routes = [];
=======
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'company/form', component: CompanyFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'farm/form', component: FarmFormComponent },
  { path: 'farm/list', component: FarmListComponent },
  { path: 'employee/form', component: EmployeeFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'employee/list', component: ShowWorkerComponent },
  { path: 'employee/edit/:id', component: EmployeeEditComponent },
  { path: 'grain/list', component: GrainsQueryComponent },
  { path: 'grain/form', component: GrainFormComponent },
  { path: 'grain/edit/:id', component: GrainEditComponent },
  { path: '**', component: Error404Component },
];
>>>>>>> local

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
