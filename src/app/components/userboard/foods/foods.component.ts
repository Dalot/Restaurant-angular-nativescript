import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { first } from 'rxjs/operators';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { User } from '@/models/user';
import { AuthenticationService } from '@/services/authentication.service';
import { ProductService } from '@/services/product.service';

@Component({
    templateUrl: './foods.component.html',
    styleUrls: ['./foods.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class FoodsComponent implements OnInit {
    currentUser: User;

    foods: any;

    constructor(
        private productService: ProductService,
        private authenticationService: AuthenticationService,
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.productService.getFoods().pipe(first()).subscribe(res => {
            this.foods = res.foods.data;
            console.log(this.foods);
        });
    }
    onFoodItemTap() {
        console.log('working');
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}
