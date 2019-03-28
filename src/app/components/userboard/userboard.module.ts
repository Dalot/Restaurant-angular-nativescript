import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { UserboardRoutingModule } from './userboard-routing.module';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

// import { HomeRoutingModule } from './home-routing.module';
import { UserboardComponent } from './userboard.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        UserboardRoutingModule
        // HomeRoutingModule
    ],
    declarations: [
        UserboardComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UserboardModule { }
