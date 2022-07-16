import { GrainEditGuard } from './../../_auth/grain/grain-edit.guard';
import { GrainEditComponent } from './grain-edit/grain-edit.component';
import { GrainFormComponent } from './grain-form/grain-form.component';
import { GeneralGuard } from './../../_auth/general.guard';
import { GrainListComponent } from './grain-list/grain-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'grain/list', component: GrainListComponent, canActivate: [GeneralGuard] },
  { path: 'grain/form', component: GrainFormComponent, canActivate: [GeneralGuard] },
  { path: 'grain/edit/:id', component: GrainEditComponent, canActivate: [GrainEditGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrainRoutingModule { }
