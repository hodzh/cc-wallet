import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { contentHeaders } from "../common/headers";
import { Credentials } from "./credentials";

@Injectable()
export class AuthResource {
  constructor(public http: Http) {
  }

  login(params: Credentials): Observable<any> {
    let body = JSON.stringify({
      email: params.email,
      password: params.password
    });
    let req = this.http.post(
      '/auth/local',
      body, {
        headers: contentHeaders
      });
    return req;
  }

  signup(params: Credentials): Observable<any> {
    let body = JSON.stringify({
      email: params.email,
      password: params.password
    });
    let req = this.http.post(
      '/auth/local',
      body, {
        headers: contentHeaders
      });
    return req;
  }
}
