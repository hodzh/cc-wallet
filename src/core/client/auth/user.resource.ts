import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from './auth-http';
import { ChangePasswordParams } from './change-password-params';
import { HttpClient } from '@angular/common/http';

export interface ResetPasswordParams {
  email: string;
}

@Injectable()
export class UserResource {
  constructor(private authHttp: AuthHttp, private http: HttpClient) {
  }

  profile(): Observable<any> {
    let req = this.authHttp.get(
      '/api/me');
    return req;
  }

  changePassword(params: ChangePasswordParams): Observable<any> {
    let body = {
      oldPassword: params.password,
      newPassword: params.newPassword,
    };
    let req = this.authHttp.put(
      '/api/me/password',
      body,
    );
    return req;
  }

  resetPassword(params: ResetPasswordParams): Observable<any> {
    let body = {
      email: params.email,
    };
    let req = this.http.put(
      '/api/me/reset-password',
      body, {
        headers: this.createHttpHeader(),
      },
    );
    return req;
  }

  emailVerify(): Observable<any> {
    let req = this.authHttp.put(
      '/api/me/email-verify',
      {},
    );
    return req;
  }

  setPassword(params: { token: string; password: string }): Observable<any> {
    let req = this.http.put(
      '/api/me/set-password',
      params, {
        headers: this.createHttpHeader(),
      },
    );
    return req;
  }

  private createHttpHeader(): {
    [header: string]: string | string[];
  } {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }
}
