import { Component, OnInit } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { first, switchMap } from 'rxjs/operators';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { ProductService } from '@/services/product.service';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit {
  private menu: any;

  constructor(
    private productService: ProductService,
    private _pageRoute: PageRoute,
    private _routerExtensions: RouterExtensions
    ) { }

  ngOnInit() {
    this._pageRoute.activatedRoute
      .pipe(switchMap((activatedRoute) => activatedRoute.params))
      .forEach((params) => {
          const menuId = params.id;

          this.productService.getMenuById(menuId).pipe(first()).subscribe(menu => {
              this.menu = menu;
          });
      });
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }
}
