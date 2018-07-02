import { AuthHttp } from '../auth/auth-http';
import { Observable } from 'rxjs';
import { QueryResult } from '../../common/query-result';
import { IDocument } from './document';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

export class Resource<TDocument extends IDocument> {
  public URL: string;

  constructor(public http: AuthHttp) {
  }

  query(params): Observable<TDocument[]> {
    return this.http.get<TDocument[]>(this.URL, params).pipe(share());
  }

  queryPage(params): Observable<QueryResult> {
    return this.http.get<QueryResult>(this.URL, params).pipe(share());
  }

  get(id): Observable<TDocument> {
    return this.http.get<TDocument>(`${this.URL}/${id}`, {}).pipe(share());
  }

  create(data): Observable<TDocument> {
    return this.http.post<TDocument>(this.URL, data).pipe(share());
  }

  update(id, data): Observable<TDocument> {
    return this.http.put<TDocument>(`${this.URL}/${id}`, data).pipe(share());
  }

  action(id, action, params?): Observable<any> {
    return this.http.put<any>(`${this.URL}/${id}/${action}`, params || {}).pipe(share());
  }

  remove(id): Observable<any> {
    return this.http.delete<any>(`${this.URL}/${id}`, {}).pipe(share());
  }
}
