import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { UserboardComponent } from '@/components/userboard/userboard.component';
import { DashboardComponent } from '@/components/dashboard/dashboard.component';
import { LoginComponent } from '@/components/login/login.component';
import { RegisterComponent } from '@/components/register/register.component';

import { AuthGuard } from '@/guards/auth.guard';
import { Role } from '@/models/role';

export const routes: Routes = [
    { 
      path: '', component: UserboardComponent, canActivate: [AuthGuard] 
      
    },
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
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
