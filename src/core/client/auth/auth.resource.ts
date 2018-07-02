import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from './credentials';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable()
export class AuthResource {
  constructor(public http: HttpClient) {
  }

  signin(params: Credentials): Observable<any> {
    return this.http.post(
      '/auth/local',
      params, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        responseType: 'json',
      }
    )
      .pipe(share());
  }

  signup(params: Credentials): Observable<any> {
    return this.http.post(
      '/api/me',
      params, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        responseType: 'json',
      }
    )
      .pipe(share());
  }
}
