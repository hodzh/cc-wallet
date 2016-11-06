import { Response } from "@angular/http";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthToken } from "./auth-token";
import { AuthResource } from "./auth.resource";
import { UserResource } from "./user.resource";
import { Credentials } from "./credentials";
import { ChangePasswordParams } from "./change-password-params";

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
              private accountResource: UserResource) {
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

  public hasRole(role: string): boolean {
    return this.currentUser.role === role;
  }

  public login(params: Credentials): Observable<any> {
    let req = this.authResource.login(params);
    req.subscribe(
      response => {
        this.onLogin(response);
      },
      error => {
        console.error(error.text());
      }
    );
    return req;
  }

  public logout(): void {
    this.authToken.reset();
  }

  public signup(params: Credentials): Observable<any> {
    let req = this.authResource.signup(params);
    req.subscribe(
      response => {
        this.onLogin(response);
      },
      error => {
        console.error(error.text());
      }
    );
    return req;
  }

  public changePassword(params: ChangePasswordParams): Observable<any> {
    let req = this.accountResource.changePassword(params);
    req.subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => {
        console.error(error.text());
      }
    );
    return req;
  }

  private onLogin(response: Response): void {
    let res = response.json();
    this.authToken.token = res['token'];
    this.currentUser = res['user'];
    this.router.navigate(['/']);
  }

  private onLogout(): void {
    this.currentUser = guest;
    this.router.navigate(['/login']);
  }

  private updateProfile(): void {
    let req = this.accountResource.profile();
    req.subscribe(
      response => {
        this.currentUser = response.json();
      },
      error => {
        console.error(error.text());
      }
    );
  }
}
