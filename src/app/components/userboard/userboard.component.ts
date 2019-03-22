import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/models/user';
import { AuthenticationService } from '@/services/authentication.service';
import { UserService } from '@/services/user.service';

@Component({templateUrl: 'userboard.component.html'})

export class UserboardComponent {
    currentUser: User;
    

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        
    }
}
