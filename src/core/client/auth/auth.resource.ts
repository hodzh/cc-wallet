import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from '../common/headers';
import { Credentials } from './credentials';

@Injectable()
export class AuthResource {
  constructor(public http: Http) {
  }

  signin(params: Credentials): Observable<any> {
    let body = JSON.stringify(params);
    let req = this.http.post(
      '/auth/local',
      body, {
        headers: contentHeaders
      })
      .map(res => res.json())
      .share();
    return req;
  }

  signup(params: Credentials): Observable<any> {
    let body = JSON.stringify(params);
    let req = this.http.post(
      '/api/me',
      body, {
        headers: contentHeaders
      })
      .map(res => res.json())
      .share();
    return req;
  }
}
