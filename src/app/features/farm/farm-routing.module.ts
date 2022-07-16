import { GeneralGuard } from './../../_auth/general.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmFormComponent } from './farm-form/farm-form.component';
import { FarmListComponent } from './farm-list/farm-list.component';

const routes: Routes = [
  { path: 'farm/form', component: FarmFormComponent, canActivate: [GeneralGuard] },
  { path: 'farm/list', component: FarmListComponent, canActivate: [GeneralGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmRoutingModule { }
