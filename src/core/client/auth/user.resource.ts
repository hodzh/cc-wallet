import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "./auth-http";
import { ChangePasswordParams } from "./change-password-params";
import { Http } from "@angular/http";

export interface ResetPasswordParams {
  email: string;
}

@Injectable()
export class UserResource {
  constructor(private authHttp: AuthHttp, private http: Http) {
  }

  profile(): Observable<any> {
    let req = this.authHttp.get(
      '/api/me');
    return req;
  }

  changePassword(params: ChangePasswordParams): Observable<any> {
    let body = JSON.stringify({
      oldPassword: params.password,
      newPassword: params.newPassword
    });
    let req = this.authHttp.put(
      '/api/me/password',
      body);
    return req;
  }

  resetPassword(params: ResetPasswordParams): Observable<any> {
    let body = JSON.stringify({
      email: params.email
    });
    let req = this.http.post(
      '/api/me/reset-password',
      body).share();
    return req;
  }

  emailVerify(): Observable<any> {
    let req = this.authHttp.put(
      '/api/me/email-verify',
      {});
    return req;
  }
}
