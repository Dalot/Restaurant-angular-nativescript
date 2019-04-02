import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import { filter, first } from 'rxjs/operators';
import * as app from 'tns-core-modules/application';

import { AuthenticationService } from '@/services/authentication.service';
import { User } from '@/models/user';
import { Role } from '@/models/role';
import { UserService } from '@/services/user.service';



@Component({ selector: 'app-root', templateUrl: 'app.component.html', styles: ['app.component.css'] })

export class AppComponent implements OnInit {
    currentUser: any;
    private activatedUrl: string;
    private sideDrawerTransition: DrawerTransitionBase;
    private userFromApi: any;

    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) { this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; }); }
    ngOnInit(): void {
        this.activatedUrl = '';
        this.sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this.activatedUrl = event.urlAfterRedirects);
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.userFromApi = user;
        });
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.admin;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    get getSideDrawerTransition(): DrawerTransitionBase {
        return this.sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this.activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: 'fade'
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}

