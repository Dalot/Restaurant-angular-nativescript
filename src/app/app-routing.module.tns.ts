import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';


import { DashboardComponent } from '@/components/dashboard/dashboard.component';
import { LoginComponent } from '@/components/login/login.component';
import { RegisterComponent } from '@/components/register/register.component';

import { AuthGuard } from '@/guards/auth.guard';
import { Role } from '@/models/role';
import { UserboardComponent } from './components/userboard/userboard.component';
import { FoodsComponent } from './components/userboard/foods/foods.component';
import { FoodDetailComponent } from './components/userboard/foods/food-detail/food-detail.component';
/*import { DrinksComponent } from './components/userboard/drinks/drinks.component';
import { DrinkDetailComponent } from './components/userboard/drinks/drink-detail/drink-detail.component';
import { MenusComponent } from './components/userboard/menus/menus.component';
import { MenuDetailComponent } from './components/userboard/menus/menu-detail/menu-detail.component';*/

const routes: Routes = [
  {
    path: '', component: UserboardComponent, canActivate: [AuthGuard]
  },
  { path: 'userboard', loadChildren: './components/userboard/userboard.module#UserboardModule',  canActivate: [AuthGuard] },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] }
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes, { enableTracing: true})],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
