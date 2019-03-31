import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { first } from 'rxjs/operators';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { User } from '@/models/user';
import { AuthenticationService } from '@/services/authentication.service';
import { ProductService } from '@/services/product.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {
  currentUser: User;

  protected drinks: any;

  constructor(
      private productService: ProductService,
      private authenticationService: AuthenticationService,
  ) {
      this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
      this.productService.getDrinks().pipe(first()).subscribe(res => {
          this.drinks = res.drinks.data;
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
