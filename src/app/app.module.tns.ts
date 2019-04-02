import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IfAndroidDirective, IfIosDirective } from '@/directives/if-platform.directive';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as mobileLocalStorage from 'nativescript-localstorage';

import { ErrorInterceptor } from '@/helpers/error.interceptor';
import { JwtInterceptor } from '@/helpers/jwt.interceptor';

import { AppRoutingModule } from '@/app-routing.module.tns';
import { AppComponent } from '@/app.component';

@NgModule({
  bootstrap: [
    AppComponent
],
  declarations: [
    AppComponent,
    IfAndroidDirective,
    IfIosDirective,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: Storage,
      useValue: mobileLocalStorage
    },
       { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
       { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
