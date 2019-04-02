import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/models/user';
import { AuthenticationService } from '@/services/authentication.service';
import { UserService } from '@/services/user.service';
import { ProductService } from '@/services/product.service';


@Component({
    templateUrl: './userboard.component.html',
    styleUrls: ['./userboard.component.scss'],
})


export class UserboardComponent implements OnInit {
    currentUser: User;
    protected userFromApi: any;
    protected foods: any;
    protected drinks: any;
    protected menus: any;

    constructor(
        private userService: UserService,
        private productService: ProductService,
        private authenticationService: AuthenticationService,
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.userFromApi = user;
        });
        this.productService.getProducts(10).pipe(first()).subscribe(res => {
            this.foods = res.foods.data;
            this.drinks = res.drinks.data;
            this.menus = res.menus.data;
        });

    }
}
