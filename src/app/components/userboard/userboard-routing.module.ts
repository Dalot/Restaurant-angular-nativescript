import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserboardComponent } from './userboard.component';


const routes: Routes = [
    { path: '', component: UserboardComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserboardRoutingModule { }
