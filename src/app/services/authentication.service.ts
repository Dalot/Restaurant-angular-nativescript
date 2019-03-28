import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { env } from '@/../environments/environment';


import { User } from '@/models/user';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private localStorage: Storage
        ) {
            this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
            this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    login(email: string, password: string) {
        const data = {
            'email': email,
            'password': password
        };

        return this.http.post<any>(`${env.config.apiUrl}/api/login`, data)
            .pipe(map( (user) => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local localStorage to keep user logged in between page refreshes
                    this.localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local localStorage to log user out
        this.localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}
