import { Http, URLSearchParams } from '@angular/http';
import { AuthHttp } from '../auth/auth-http';
import { Observable } from 'rxjs/Observable';
import { QueryResult } from './query-result';
import { IDocument } from './document';

export class Resource<TDocument extends IDocument> {
  public URL: string;

  constructor(public http: AuthHttp | Http) {
  }

  query(params): Observable<TDocument[]> {
    let searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      searchParams.set(key, params[key]);
    });
    let req = this.http.get(this.URL, {
      search: searchParams
    }).map(res => res.json()).share();
    return req;
  }

  queryPage(params): Observable<QueryResult> {
    let searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      searchParams.set(key, params[key]);
    });
    let req = this.http.get(this.URL, {
      search: searchParams
    }).map(res => res.json()).share();
    return req;
  }

  get(id): Observable<TDocument> {
    return this.http.get(`${this.URL}/${id}`)
      .map(res => res.json()).share();
  }

  create(data): Observable<TDocument> {
    return this.http.post(this.URL, data)
      .map(res => res.json()).share();
  }

  update(id, data): Observable<TDocument> {
    return this.http.put(`${this.URL}/${id}`, data)
      .map(res => res.json()).share();
  }

  action(id, action, params): Observable<any> {
    return this.http.put(`${this.URL}/${id}/${action}`, params)
      .map(res => res.json()).share();
  }

  remove(id): Observable<boolean> {
    return this.http.delete(`${this.URL}/${id}`)
      .map(res => true).share();
  }
}
