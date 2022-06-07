import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterfaceComponent } from './_interfaces/interface/interface.component';
import { AuthComponent } from './_auths/auth/auth.component';
import { ViewComponent } from './_views/view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    InterfaceComponent,
    AuthComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
