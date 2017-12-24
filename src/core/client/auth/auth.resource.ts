import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Credentials } from './credentials';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthResource {
  constructor(public http: HttpClient) {
  }

  signin(params: Credentials): Observable<any> {
    let req = this.http.post(
      '/auth/local',
      params, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        responseType: 'json',
      })
      .share();
    return req;
  }

  signup(params: Credentials): Observable<any> {
    let req = this.http.post(
      '/api/me',
      params, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        responseType: 'json',
      })
      .share();
    return req;
  }
}
