import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { UserboardRoutingModule } from './userboard-routing.module';
import { UserboardComponent } from './userboard.component';



@NgModule({
    imports: [
        UserboardRoutingModule,
    ],
    declarations: [
        UserboardComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UserboardModule { }
