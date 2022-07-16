import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { LoginComponent } from './features/login/login/login.component';
import { GeneralGuard } from './_auth/general.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [GeneralGuard]},
  { path: '', loadChildren: () => import('./features/features-routing.module').then(m => m.FeaturesRoutingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
