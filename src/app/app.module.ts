import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterfaceComponent } from './_interfaces/interface/interface.component';
import { AuthComponent } from './_auths/auth/auth.component';
import { ViewComponent } from './_views/view/view.component';
import { UserNavBarComponent } from './_components/user-nav-bar/user-nav-bar.component';
import { ButtonComponent } from './_components/button/button.component';
import { LoginComponent } from './login/login.component';
import { GrainFormComponent } from './_components/grain/grain-form/grain-form.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { FarmFormComponent } from './_components/farm/farm-form/farm-form.component';
import { FarmListComponent } from './_components/farm/farm-list/farm-list.component';

@NgModule({
  declarations: [
    AppComponent, 
    InterfaceComponent, 
    AuthComponent, 
    ButtonComponent, 
    ViewComponent, 
    LoginComponent, 
    UserNavBarComponent, 
    GrainFormComponent, 
    SidebarComponent, 
    FarmFormComponent, 
    FarmListComponent],

  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
