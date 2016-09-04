import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthToken } from './auth-token';
import { AuthResource } from './auth.resource';
import { AccountResource } from './account.resource';
import { Credentials } from './credentials';
import { ChangePasswordParams } from './change-password-params';

const guest: IUserProfile = {
  email: '',
  emailValid: false,
  role: 'guest'
};

@Injectable()
export class Auth {
  public currentUser: IUserProfile = guest;

  constructor(public router: Router,
              private authToken: AuthToken,
              private authResource: AuthResource,
              private accountResource: AccountResource) {
    if (this.isLoggedIn) {
      this.updateProfile();
    }

    this.authToken.tokenChange.subscribe(
      (token: string) => {
        if (!token) {
          this.onLogout();
        }
      }
    );
  }

  public get isLoggedIn(): boolean {
    return Boolean(this.authToken.token);
  }

  public hasRole(role: string) {
    return this.currentUser.role === role;
  }

  public login(params: Credentials): Observable<any> {
    //console.log('login', params.email, params.password);
    let req = this.authResource.login(params);
    req.subscribe(
      response => {
        this.onLogin(response);
      },
      error => {
        console.log(error.text());
      }
    );
    return req;
  }

  public logout() {
    this.authToken.reset();
  }

  public signup(params: Credentials): Observable<any> {
    console.log('signup', params.email, params.password);
    let req = this.authResource.signup(params);
    req.subscribe(
      response => {
        this.onLogin(response);
      },
      error => {
        console.log(error.text());
      }
    );
    return req;
  }

  public changePassword(params: ChangePasswordParams): Observable<any> {
    //console.log('changePassword', params.password, params.newPassword);
    let req = this.accountResource.changePassword(params);
    req.subscribe(
      response => {
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error.text());
      }
    );
    return req;
  }

  private onLogin(response: Response) {
    let res = response.json();
    //console.log(res);
    this.authToken.token = res['token'];
    this.currentUser = res['user'];
    this.router.navigate(['/']);
  }

  private onLogout() {
    this.currentUser = guest;
    this.router.navigate(['/login']);
  }

  private updateProfile() {
    let auth = this;
    let req = this.accountResource.profile();
    req.subscribe(
      response => {
        auth.currentUser = response.json();
      },
      error => {
        console.log(error.text());
      }
    );
    return req;
  }
}
