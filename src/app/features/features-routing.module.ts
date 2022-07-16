import { Error404Component } from './../_views/error404/error404.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule)},
  { path: '', loadChildren: () => import('./login/login-routing.module').then(m => m.LoginRoutingModule)},
  { path: '', loadChildren: () => import('./signin/signin-routing.module').then(m => m.SigninRoutingModule)},
  { path: '', loadChildren: () => import('./farm/farm-routing.module').then(m => m.FarmRoutingModule)},
  { path: '', loadChildren: () => import('./grain/grain-routing.module').then(m => m.GrainRoutingModule)},
  { path: '', loadChildren: () => import('./employee/employee-routing.module').then(m => m.EmployeeRoutingModule)},
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
