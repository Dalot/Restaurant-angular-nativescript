import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { env } from '@/../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(private http: HttpClient) { }

    getFoods() {
        return this.http.get<any>(`${env.config.apiUrl}/api/products/foods`, this.httpOptions );
    }

    getDrinks() {
        return this.http.get<any>(`${env.config.apiUrl}/api/products/drinks`, this.httpOptions );
    }

    getMenus() {
        return this.http.get<any>(`${env.config.apiUrl}/api/products/menus`, this.httpOptions );
    }

    getFoodById(id) {
      return this.http.get<any>(`${env.config.apiUrl}/api/food/products/${id}`, this.httpOptions );
  }
    getDrinkById(id) {
      return this.http.get<any>(`${env.config.apiUrl}/api/drink/products/${id}`, this.httpOptions );
  }
    getMenuById(id) {
      return this.http.get<any>(`${env.config.apiUrl}/api/menu/products/${id}`, this.httpOptions );
  }
}
