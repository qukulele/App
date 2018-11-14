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
import { MemberListComponent } from './member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AutchGuard } from './guards/autch.guard';

@NgModule({
   // tutaj sią zarejestrowane componenty jakich uzywam\
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes)
   ],
   // tutaj sąservisy jakich używam
   providers: [
      AuthService,
      ErrorInterceptorProvide,
      AlertyfiService,
      AutchGuard
   ],
   bootstrap: [
      AppComponent
   ],
})
export class AppModule { }
