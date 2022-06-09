import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserNavBarComponent } from './_components/user-nav-bar/user-nav-bar.component';
import { ButtonComponent } from './_components/button/button.component';
import { LoginComponent } from './login/login.component';
import { GrainFormComponent } from './_components/grain/grain-form/grain-form.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { FarmFormComponent } from './_components/farm/farm-form/farm-form.component';
import { GrainsQueryComponent } from './_components/grain/grains-query/grains-query.component';

@NgModule({
  declarations: [AppComponent, ButtonComponent, LoginComponent, UserNavBarComponent, GrainFormComponent, SidebarComponent, FarmFormComponent, GrainsQueryComponent],

  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
