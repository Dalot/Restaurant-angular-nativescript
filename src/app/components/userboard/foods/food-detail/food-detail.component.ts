import { Component, OnInit } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { first, switchMap } from 'rxjs/operators';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { ProductService } from '@/services/product.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  private food: any;

  constructor(
    private productService: ProductService,
    private _pageRoute: PageRoute,
    private _routerExtensions: RouterExtensions
    ) { }

  ngOnInit() {
    this._pageRoute.activatedRoute
      .pipe(switchMap((activatedRoute) => activatedRoute.params))
      .forEach((params) => {
          const foodId = params.id;

          this.productService.getFoodById(foodId).pipe(first()).subscribe(food => {
              this.food = food;
          });
      });
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

}
