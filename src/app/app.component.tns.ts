import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@/services/authentication.service';
import { User } from '@/models/user';

require( "nativescript-observable-subscribe/observablesubscribe" );


@Component({ selector: 'app-root', templateUrl: 'app.component.html' })

export class AppComponent {
    currentUser = new User;
    userIsAdmin: string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => {
            this.currentUser = x;
            console.log(typeof x);
            this.userIsAdmin = x.role;
        }, User);

    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}

