import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { ErrorInterceptor } from '@/helpers/error.interceptor';
import { JwtInterceptor } from '@/helpers/jwt.interceptor';

import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from '@/app.component';
import { AlertComponent } from '@/components/alert/alert.component';
import { DashboardComponent } from '@/components/dashboard/dashboard.component';
import { LoginComponent } from '@/components/login/login.component';
import { RegisterComponent } from '@/components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: Storage,
      useValue: localStorage
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
