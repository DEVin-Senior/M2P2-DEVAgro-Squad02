import { EmployeeEditComponent } from './features/employee/employee-edit/employee-edit/employee-edit.component';
import { EmployeeFormComponent } from './features/employee/employee-form/employee-form.component';
import { GrainListComponent } from './features/grain/grain-list/grain-list.component';
import { GrainFormComponent } from './features/grain/grain-form/grain-form.component';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserNavBarComponent } from './_components/user-nav-bar/user-nav-bar.component';
import { ButtonComponent } from './_components/button/button.component';
import { LoginComponent } from './features/login/login/login.component';
import { ShowWorkerComponent } from './_components/show-worker/show-worker.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { CompanyFormComponent } from './features/signin/company-form/company-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './_shared/shared.module';
import { FarmFormComponent } from './features/farm/farm-form/farm-form.component';
import { FarmListComponent } from './features/farm/farm-list/farm-list.component';
import { HomeComponent } from './features/home/home/home.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { FarmTableComponent } from './_components/farm-table/farm-table.component';
import { ListComponent } from './_components/show-worker/list/list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Error404Component } from './_views/error404/error404.component';
import { GrainEditComponent } from './features/grain/grain-edit/grain-edit.component';

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
    FarmTableComponent,
    ListComponent,
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
