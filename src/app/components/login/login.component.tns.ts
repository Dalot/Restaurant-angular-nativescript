import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { alert, prompt } from 'tns-core-modules/ui/dialogs';
import { Page } from 'tns-core-modules/ui/page';

import { AlertService } from '@/services/alert.service';

import { AuthenticationService } from '@/services/authentication.service';

@Component({
    moduleId: module.id,
    templateUrl: './login.component.tns.html',
    styleUrls: ['./login.component.tns.css']
})
export class LoginComponent implements OnInit {

    isLoggingIn = true;
    loginForm: FormGroup;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    @ViewChild('password') password: ElementRef;
    @ViewChild('confirmPassword') confirmPassword: ElementRef;
    currentUserSubject: any;
    error: any;

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
        if (this.isLoggingIn) {
            this.loginForm = this.formBuilder.group({
                email: ['', Validators.required],
                password: ['', Validators.required]
            });
        }
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required, Validators.minLength(6)],
            password_confirmation: ['', Validators.required],
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get l() { return this.loginForm.controls; }
    get r() { return this.registerForm.controls; }


    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submitLogin() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        if (!this.l.email.value || !this.l.password.value) {
            this.alert('Please provide both an email address and password.');
            return;
        }
        this.login();
    }
    submitRegister() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.register();
    }
    login() {
        this.authenticationService.login(this.l.email.value, this.l.password.value)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

    register() {
        if (this.r.password.value !== this.r.password_confirmation.value) {
            this.alert('Your passwords do not match.');
            return;
        }
        if (!this.r.name.value) {
            this.alert('Please complete all the fields');
        }
        this.authenticationService.register(
            this.r.name.value,
            this.r.email.value,
            this.r.password.value,
            this.r.password_confirmation.value)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
    forgotPassword() {
        prompt({
          title: 'Forgot Password',
          message: 'Enter the email address you used to register for to reset your password.',
          defaultText: '',
          okButtonText: 'Ok',
          cancelButtonText: 'Cancel'
        }).then((data) => {
          if (data.result) {
            // Call the backend to reset the password
            alert({
              title: '3rd Little Duck',
              message: 'Your password was successfully reset. Please check your email for instructions on choosing a new password.',
              okButtonText: 'Ok'
            });
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
            title: '3RD Little Duck',
            okButtonText: 'OK',
            message: message
        });
    }
}


