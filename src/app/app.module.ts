import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserNavBarComponent } from './_components/user-nav-bar/user-nav-bar.component';
import { ButtonComponent } from './_components/button/button.component';
import { LoginComponent } from './_views/login/login.component';
import { ShowWorkerComponent } from './_views/employee/show-employee.component';
import { GrainFormComponent } from './_views/grain/grain-form/grain-form.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { CompanyFormComponent } from './_views/company/company-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './_shared/shared.module';
import { FarmFormComponent } from './_views/farm/farm-form/farm-form.component';
import { GrainListComponent } from './_views/grain/grain-list/grain-list.component';
import { FarmListComponent } from './_views/farm/farm-list/farm-list.component';
import { EmployeeFormComponent } from './_views/employee/employee-form/employee-form.component';
import { HomeComponent } from './_components/home/home/home.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ShowFarmComponent } from './_views/farm/show-farm.component';
import { EmployeeListComponent } from './_views/employee/employee-list/employee-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Error404Component } from './_views/error404/error404.component';
import { GrainEditComponent } from './_views/grain/grain-edit/grain-edit.component';
import { EmployeeEditComponent } from './_views/employee/employee-edit/employee-edit.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    UserNavBarComponent,
    ShowWorkerComponent,
    GrainFormComponent,
    SidebarComponent,
    FarmFormComponent,
    FarmListComponent,
    CompanyFormComponent,
    GrainListComponent,
    EmployeeFormComponent,
    HomeComponent,
    ShowFarmComponent,
    EmployeeListComponent,
    Error404Component,
    GrainEditComponent,
    EmployeeEditComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgApexchartsModule,
    NgxMaskModule.forRoot(maskConfig), //https://www.npmjs.com/package/ngx-mask (como usar)
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule { }
