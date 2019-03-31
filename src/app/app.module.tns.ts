import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IfAndroidDirective, IfIosDirective } from '@/directives/if-platform.directive';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

import * as mobileLocalStorage from 'nativescript-localstorage';

import { ErrorInterceptor } from '@/helpers/error.interceptor';
import { JwtInterceptor } from '@/helpers/jwt.interceptor';

import { AppRoutingModule } from '@/app-routing.module.tns';
import { AppComponent } from '@/app.component';
import { AutoGeneratedComponent } from '@/components/auto-generated/auto-generated.component';
import { AlertComponent } from '@/components/alert/alert.component';
import { DashboardComponent } from '@/components/dashboard/dashboard.component';
import { LoginComponent } from '@/components/login/login.component';
import { RegisterComponent } from '@/components/register/register.component';
import { UserboardComponent } from '@/components/userboard/userboard.component';
import { FoodsComponent } from '@/components/userboard/foods/foods.component';
import { FoodDetailComponent } from '@/components/userboard/foods/food-detail/food-detail.component';
import { DrinksComponent } from '@/components/userboard/drinks/drinks.component';
import { DrinkDetailComponent } from './components/userboard/drinks/drink-detail/drink-detail.component';
import { MenusComponent } from './components/userboard/menus/menus.component';
import { MenuDetailComponent } from './components/userboard/menus/menu-detail/menu-detail.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  bootstrap: [
    AppComponent
],
  declarations: [
    AppComponent,
    AutoGeneratedComponent,
    AlertComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    UserboardComponent,
    FoodsComponent,
    FoodDetailComponent,
    IfAndroidDirective,
    IfIosDirective,
    DrinksComponent,
    DrinkDetailComponent,
    MenusComponent,
    MenuDetailComponent

  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptUISideDrawerModule,
    ReactiveFormsModule,
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
