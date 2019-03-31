import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
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
import { AuthenticationService } from '@/services/authentication.service';
import { UserService } from '@/services/user.service';
import { ProductService } from '@/services/product.service';
import { EventData } from 'tns-core-modules/ui/page/page';

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
    @ViewChild(RadSideDrawer) sideDrawerComponent: RadSideDrawer;

    constructor(
        private userService: UserService,
        private productService: ProductService,
        private authenticationService: AuthenticationService,
        private routerExtensions: RouterExtensions
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.userFromApi = user;
        });
        this.productService.getFoods().pipe(first()).subscribe(res => {
            this.foods = res.foods.data;
        });
        this.productService.getDrinks().pipe(first()).subscribe(res => {
            this.drinks = res.drinks.data;
        });
        this.productService.getMenus().pipe(first()).subscribe(res => {
            this.menus = res.menus.data;
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    onFoodItemTap(args: EventData): void {
        const tappedFoodItemId = args.object.get('id');
        this.routerExtensions.navigate([`/userboard/foods/${tappedFoodItemId}`],
        {
            animated: true,
            transition: {
                name: 'slide',
                duration: 200,
                curve: 'ease'
            }
        });
    }
    onDrinkItemTap(args: EventData): void {
        const tappedDrinkItemId = args.object.get('id');
        this.routerExtensions.navigate([`/userboard/drinks/${tappedDrinkItemId}`],
        {
            animated: true,
            transition: {
                name: 'slide',
                duration: 200,
                curve: 'ease'
            }
        });
    }
    onMenuItemTap(args: EventData): void {
        const tappedMenuItemId = args.object.get('id');
        this.routerExtensions.navigate([`/userboard/menus/${tappedMenuItemId}`],
        {
            animated: true,
            transition: {
                name: 'slide',
                duration: 200,
                curve: 'ease'
            }
        });
    }
    onSeeMoreFoodTap(): void {
        this.routerExtensions.navigate([`/userboard/foods`],
        {
            animated: true,
            transition: {
                name: 'slide',
                duration: 200,
                curve: 'ease'
            }
        });
    }
    onSeeMoreDrinkTap(): void {
        this.routerExtensions.navigate([`/userboard/drinks`],
        {
            animated: true,
            transition: {
                name: 'slide',
                duration: 200,
                curve: 'ease'
            }
        });
    }
    onSeeMoreMenuTap(): void {
        this.routerExtensions.navigate([`/userboard/menus`],
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
