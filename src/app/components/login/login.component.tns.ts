import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";


import { first } from 'rxjs/operators';
import { AlertService } from '@/services/alert.service';

import { AuthenticationService } from '@/services/authentication.service';

@Component({
    moduleId: module.id,
    templateUrl: "./login.component.tns.html",
    styleUrls: ['./login.component.tns.css']
})
export class LoginComponent implements OnInit {

    isLoggingIn = true;
    
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private page: Page, 
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
        ) {
        this.page.actionBarHidden = true;
        
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
        
    }
    
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }


    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        
        if (!this.f.email.value || !this.f.password.value) {
            this.alert("Please provide both an email address and password.");
            return;
        }

        if (this.isLoggingIn) {
            this.login();
        } else {
            this.register();
        }
    }

    login() {
        
        console.log(this.f.password.value);
        this.authenticationService.login(this.f.email.value, this.f.password.value).subscribe(success => {
             console.log(success);
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.storage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                
                this.router.navigate([this.returnUrl]);
            }
            else
            {
                this.alertService.error(error);
                this.loading = false;
            }
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        }
        );
           
    }

    register() {
        if (this.password != this.confirmPassword) {
            this.alert("Your passwords do not match.");
            return;
        }
        //REGISTER
    }

    forgotPassword() {
        prompt({
            title: "Forgot Password",
            message: "Enter the email address you used to register for APP NAME to reset your password.",
            inputType: "email",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then((data) => {
            if (data.result) {
                /*this.userService.resetPassword(data.text.trim())
                    .then(() => {
                        this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                    }).catch(() => {
                        this.alert("Unfortunately, an error occurred resetting your password.");
                    });*/
            }
        });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }
    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }

    alert(message: string) {
        return alert({
            title: "3RD Little Duck",
            okButtonText: "OK",
            message: message
        });
    }
}

