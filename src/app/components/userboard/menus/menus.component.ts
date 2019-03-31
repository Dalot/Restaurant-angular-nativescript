import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { first } from 'rxjs/operators';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { User } from '@/models/user';
import { AuthenticationService } from '@/services/authentication.service';
import { ProductService } from '@/services/product.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  currentUser: User;

  protected menus: any;

  constructor(
      private productService: ProductService,
      private authenticationService: AuthenticationService,
  ) {
      this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
      this.productService.getMenus().pipe(first()).subscribe(res => {
          this.menus = res.menus.data;
      });
  }
  onMenuItemTap() {
      console.log('working');
  }
  onDrawerButtonTap(): void {
      const sideDrawer = <RadSideDrawer>app.getRootView();
      sideDrawer.showDrawer();
  }
}
