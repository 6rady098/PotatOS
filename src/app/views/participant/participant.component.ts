import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users.service';
import { MyErrorStateMatcher } from '../login/errorstatematcher';
import { AuthService } from 'src/app/auth/auth.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { InitPageComponent } from '../init-page.component';
import { CodetableService } from 'src/app/services/codetable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-researcherlogin',
  templateUrl: './researcherlogin.component.html',
  styleUrls: ['./researcherlogin.component.css']
})
export class ResearcherloginComponent extends InitPageComponent implements OnInit, OnDestroy, AfterViewChecked {

  username: string;
  password: string;
  confirmationPassword: string;
  users: any;
  model: User;
  showRegisterForm: boolean;
  showLoginForm: boolean;

  passwordMatches: boolean;
  userFound: boolean;
  userExists: boolean;

  usernameFormControl: any;
  registrationUsernameFormControl: any;
  passwordFormControl: any;
  registrationPasswordFormControl: any;
  confirmPasswordFormControl: any;

  matcher = new MyErrorStateMatcher();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private codetableService: CodetableService,
    private router: Router,
    private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.initializeOnLoad();

    this.authService
      .getAuthStatusListener()
      .subscribe(res => {
        if (res === false) {
          this.userFound = false;
        } else {
          this.userFound = true;
        }
      });
  }

  resetFieldErrors() {
    this.usernameFormControl = new FormControl('', [
      Validators.required
    ]);

    this.registrationUsernameFormControl = new FormControl('', [
      Validators.required
    ]);

    this.passwordFormControl = new FormControl('', [
      Validators.required
    ]);

    this.registrationPasswordFormControl = new FormControl('', [
      Validators.required
    ]);

    this.confirmPasswordFormControl = new FormControl('', [
      Validators.required
    ]);
  }

  initializeOnLoad() {
    this.showRegisterForm = false;
    this.passwordMatches = true;
    this.userFound = true;
    this.userExists = false;
    this.resetFieldErrors();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.cdr.detach();
  }

  loginValid() {
    return !this.username || !this.password ? false : true;
  }

  registrationValid() {
      return !this.model.username
        || !this.model.password
        || !this.confirmationPassword
        ? false : true;
  }

  login(loginUsername, loginPassword) {
    if (loginPassword !== undefined) {
      this.authService.login(loginUsername, loginPassword);
    }
  }

  loginForm() {
    this.showLoginForm = true;
  }

  register() {
    this.model = new User();
    this.confirmationPassword = '';
    this.showRegisterForm = true;
    this.passwordMatches = true;
    this.userExists = false;
    this.resetFieldErrors();
  }

  close() {
    this.model = new User();
    this.confirmationPassword = '';
    this.showRegisterForm = false;
    this.userExists = false;
    this.resetFieldErrors();
  }

  create() {
    if (this.model.password === this.confirmationPassword) {
      this.model.role = 1;
      this.userService.create(this.model).subscribe(
        res => {
          if (res.status === 201) {
            this.close();
          }
        },
        error => {
          if (error.status === 422) {
            this.userExists = true;
          }
        }
      );
    } else {
      this.passwordMatches = false;
    }
  }
}
