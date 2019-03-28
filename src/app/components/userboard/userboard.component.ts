import { Component, OnInit } from '@angular/core';
import { first, map } from 'rxjs/operators';

import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';

import { User } from '@/models/user';
import { Food } from '@/models/food';
import { AuthenticationService } from '@/services/authentication.service';
import { UserService } from '@/services/user.service';

@Component({
    templateUrl: './userboard.component.html',
    styles: ['./userboard.component.css']
})

export class UserboardComponent implements OnInit {
    currentUser: User;
    userFromApi: any;
    private food: Food;
    private foods: any;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.userFromApi = user;
        });
        this.userService.getFoods().pipe(first()).subscribe(res => {
            this.foods = res.foods.data;
        })
    }

    onDrawerButtonTap(): void {
        const sideDrawer = app.getRootView() as RadSideDrawer;
        sideDrawer.showDrawer();
    }
}
