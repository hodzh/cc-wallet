import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DbResource {
  constructor(private http: HttpClient) {
  }

  clearAll(): Observable<any> {
    let req = this.http.get(
      '/aapi/dev/db/clear-all');
    return req;
  }

  addUsers(): Observable<any> {
    let req = this.http.get(
      '/aapi/dev/db/add-users');
    return req;
  }
}
