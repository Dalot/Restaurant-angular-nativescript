import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { UserboardRoutingModule } from './userboard-routing.module';
import { UserboardComponent } from './userboard.component';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        UserboardRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
    ],
    declarations: [
        UserboardComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UserboardModule { }
