import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { first, map } from 'rxjs/operators';

import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
registerElement('CardView', () => CardView);

import { RouterExtensions } from 'nativescript-angular/router';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { ListViewEventData } from 'nativescript-ui-listview';
import { ScrollEventData, ScrollView } from 'tns-core-modules/ui/scroll-view';
import * as app from 'tns-core-modules/application';

import { User } from '@/models/user';
import { Food } from '@/models/food';
import { Drink } from '@/models/drink';
import { Menu } from '@/models/menu';
import { AuthenticationService } from '@/services/authentication.service';
import { UserService } from '@/services/user.service';

@Component({
    templateUrl: './userboard.component.html',
    styleUrls: ['./userboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class UserboardComponent implements OnInit {
    currentUser: User;
    protected userFromApi: any;
    protected foods: any;
    protected drinks: any;
    protected menus: any;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private routerExtensions: RouterExtensions
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.userFromApi = user;
        });
        this.userService.getFoods().pipe(first()).subscribe(res => {
            this.foods = res.foods.data;
        });
        this.userService.getDrinks().pipe(first()).subscribe(res => {
            this.drinks = res.drinks.data;
        });
        this.userService.getMenus().pipe(first()).subscribe(res => {
            this.menus = res.menus.data;
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = app.getRootView() as RadSideDrawer;
        sideDrawer.showDrawer();
    }

    onFoodItemTap(args: ListViewEventData): void {
        const tappedCarItem = args.view.bindingContext;

        this.routerExtensions.navigate(['/products/product-detail', tappedCarItem.id],
            {
                animated: true,
                transition: {
                    name: 'slide',
                    duration: 200,
                    curve: 'ease'
                }
            });
    }
    onScroll(args: ScrollEventData) {
        console.log('scrollX: ' + args.scrollX + '; scrollY: ' + args.scrollY);
    }

    onScrollLoaded(args) {
        // scroll to specific position of the horizontal scroll list
        let scrollOffset = 330;
        (args.object as ScrollView).scrollToHorizontalOffset(scrollOffset, true);
    }
}
