import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserNavBarComponent } from './_components/user-nav-bar/user-nav-bar.component';
import { ButtonComponent } from './_components/button/button.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { GrainFormComponent } from './_components/grain-form/grain-form.component';

@NgModule({
  declarations: [AppComponent, ButtonComponent, LoginComponent, UserNavBarComponent, GrainFormComponent],
  imports: [BrowserModule, AppRoutingModule],
=======
import { SidebarComponent } from './_components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    SidebarComponent,
    UserNavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
>>>>>>> e257da00996b38879c8d2f15fa80f91f3207d394
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
