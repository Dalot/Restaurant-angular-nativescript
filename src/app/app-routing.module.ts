import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserboardComponent } from '@/components/userboard/userboard.component';
import { DashboardComponent } from '@/components/dashboard/dashboard.component';
import { LoginComponent } from '@/components/login/login.component';
import { RegisterComponent } from '@/components/register/register.component';
import { FoodsComponent } from './components/userboard/foods/foods.component';
import { FoodDetailComponent } from './components/userboard/foods/food-detail/food-detail.component';

import { AuthGuard } from '@/guards/auth.guard';
import { Role } from '@/models/role';

const routes: Routes = [
    {
      path: '', component: UserboardComponent, canActivate: [AuthGuard]
    },
    { path: 'userboard', component: UserboardComponent, outlet: 'userboard', canActivate: [AuthGuard] },
    { path: 'userboard/foods', component: FoodsComponent, outlet: 'userboard'},
    { path: 'userboard/foods/:id', component: FoodDetailComponent, outlet: 'userboard'},
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
