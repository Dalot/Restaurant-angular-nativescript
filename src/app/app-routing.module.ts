import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '@/components/dashboard/dashboard.component';
import { LoginComponent } from '@/components/login/login.component';
import { RegisterComponent } from '@/components/register/register.component';

import { AuthGuard } from '@/guards/auth.guard';
import { Role } from '@/models/role';

const routes: Routes = [
    {
      path: '', redirectTo: '/userboard', pathMatch: 'full'
    },
    { path: 'userboard', loadChildren: '@/components/userboard/userboard.module#UserboardModule', canActivate: [AuthGuard], },
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
