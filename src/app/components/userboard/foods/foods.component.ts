import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { first } from 'rxjs/operators';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { User } from '@/models/user';
import { AuthenticationService } from '@/services/authentication.service';
import { ProductService } from '@/services/product.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './foods.component.html',
    styleUrls: ['./foods.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class FoodsComponent implements OnInit, OnDestroy {
    _isLoading = false;
    currentUser: User;
    _foods: any;
    _dataSubscription: Subscription;

    constructor(
        private productService: ProductService,
        private authenticationService: AuthenticationService,
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        if (!this._foods) {

            return this.productService.getFoods()
                .pipe(first())
                .subscribe((res) => {
                    this._foods = res.foods.data;
                });
        }
    }
    ngOnDestroy(): void {
        if (this._foods) {
            this._foods = null;
        }
    }
    get foods(): any {
        return this._foods;
    }
    get isLoading(): boolean {
        return this._isLoading;
    }
    onFoodItemTap() {
        console.log('working');
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}
