import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@/services/authentication.service';
import { User } from '@/models/user';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })

export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        console.log(this.authenticationService.currentUser);
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        console.log(this.authenticationService.currentUser);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
