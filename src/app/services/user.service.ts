import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { env } from '@/../environments/environment';
import { User } from '@/models/user';
import { Food } from '@/models/food';

@Injectable({ providedIn: 'root' })
export class UserService {
    
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.post<User[]>(`${env.config.apiUrl}/api/admin/users`, this.httpOptions );
    }

    getById(id: number) {
        return this.http.get(`${env.config.apiUrl}/api/user/${id}`);
    }

    register(user: User) {
        return this.http.post(`${env.config.apiUrl}/api/register`, user);
    }

    update(user: User) {
        return this.http.put(`${env.config.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${env.config.apiUrl}/users/${id}`);
    }

    getFoods() {
        return this.http.get<any>(`${env.config.apiUrl}/api/products/foods`, this.httpOptions );
    }
}