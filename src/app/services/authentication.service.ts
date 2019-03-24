import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';


import { map } from 'rxjs/operators';
import { env } from '@/../environments/environment';
import { CustomStorageService } from '@/services/customstorage.service';

import { User } from '@/models/user';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
   

    constructor(
        private http: HttpClient,
        private storage: CustomStorageService
        
        ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.storage.getItem('currentUser')));
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
        console.log("dd");
        return this.http.post<any>(`${env.config.apiUrl}/api/login`, this.getFormUrlEncoded(data));
            
    }
    
    mobileLogin(email: string, password: string) {

        return this.http.post<any>(`${env.config.apiUrl}/api/login`, { email, password })
            .pipe(map( (user) => {
                console.log(user);
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.storage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this.storage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    
    getFormUrlEncoded(toConvert) {
		const formBody = [];
		for (const property in toConvert) {
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent(toConvert[property]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		return formBody.join('&');
	}
    

}