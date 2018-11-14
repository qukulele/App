import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/Auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {ErrorInterceptorProvide} from './services/error.interceptor';
import { AlertyfiService } from './services/alertyfi.service';

import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
    // tutaj sią zarejestrowane componenty jakich uzywam
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
   ],
   // tutaj są servisy jakich używam
   providers: [
      AuthService,
      ErrorInterceptorProvide,
      AlertyfiService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
