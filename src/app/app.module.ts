import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserNavBarComponent } from './_components/user-nav-bar/user-nav-bar.component';
import { ButtonComponent } from './_components/button/button.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { CompanyFormComponent } from './_components/company/company-form/company-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './_shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    SidebarComponent,
    UserNavBarComponent,
    CompanyFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
