import { Component, OnInit } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { first, switchMap } from 'rxjs/operators';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { ProductService } from '@/services/product.service';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.css']
})
export class DrinkDetailComponent implements OnInit {
  private drink: any;

  constructor(
    private productService: ProductService,
    private _pageRoute: PageRoute,
    private _routerExtensions: RouterExtensions
    ) { }

  ngOnInit() {
    this._pageRoute.activatedRoute
      .pipe(switchMap((activatedRoute) => activatedRoute.params))
      .forEach((params) => {
          const drinkId = params.id;

          this.productService.getDrinkById(drinkId).pipe(first()).subscribe(drink => {
              this.drink = drink;
          });
      });
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }
}
