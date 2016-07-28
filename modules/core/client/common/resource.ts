import {
  Injectable
} from '@angular/core';

import {
  Http,
  URLSearchParams
} from '@angular/http';

import { AuthHttp } from '../auth/auth-http';
import { Observable } from 'rxjs/Observable';
import { QueryResult } from './query-result';

export class Resource {
  public URL: string;

  constructor(public http: AuthHttp) {
  }

  query(params): Observable<QueryResult> {
    let searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      searchParams.set(key, params[key]);
    });
    var req = this.http.get(this.URL, {
      search: searchParams
    })
      .map(res => res.json());
    return req;
  }

  create(data) {
    return this.http.post(this.URL, data)
      .map(res => res.json());
  }

  update(data) {
    return this.http.put(this.URL, data)
      .map(res => res.json());
  }

  remove(id) {
    return this.http.del(this.URL + '/' + id);
  }
}
