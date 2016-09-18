import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";

@Injectable()
export class DbResource {
  constructor(private http: Http) {
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
