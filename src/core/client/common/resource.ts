import { AuthHttp } from '../auth/auth-http';
import { Observable } from 'rxjs/Observable';
import { QueryResult } from '../../common/query-result';
import { IDocument } from './document';
import { HttpClient } from '@angular/common/http';

export class Resource<TDocument extends IDocument> {
  public URL: string;

  constructor(public http: AuthHttp) {
  }

  query(params): Observable<TDocument[]> {
    return this.http.get<TDocument[]>(this.URL, params).share();
  }

  queryPage(params): Observable<QueryResult> {
    return this.http.get<QueryResult>(this.URL, params).share();
  }

  get(id): Observable<TDocument> {
    return this.http.get<TDocument>(`${this.URL}/${id}`, {}).share();
  }

  create(data): Observable<TDocument> {
    return this.http.post<TDocument>(this.URL, data).share();
  }

  update(id, data): Observable<TDocument> {
    return this.http.put<TDocument>(`${this.URL}/${id}`, data).share();
  }

  action(id, action, params?): Observable<any> {
    return this.http.put<any>(`${this.URL}/${id}/${action}`, params || {}).share();
  }

  remove(id): Observable<any> {
    return this.http.delete<any>(`${this.URL}/${id}`, {}).share();
  }
}
