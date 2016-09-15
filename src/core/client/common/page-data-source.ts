import { Resource } from './resource';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { QueryResult } from '../../common/query-result';
import { DataSource } from './data-source';
import { IDocument } from './document';

export interface DataSourceOptions {
  paginate?: boolean;
  sortable?: boolean;
}

export interface PageInfo {
  size: number;
  index: number;
}

export class PageDataSource<TDocument extends IDocument> extends DataSource<TDocument> {

  public get totalCount(): Observable<number> {
    return this.totalCountSubject.asObservable();
  }

  public get currentPage(): Observable<number> {
    return this.currentPageSubject.asObservable();
  }

  public get pageSize(): Observable<number> {
    return this.pageSizeSubject.asObservable();
  }

  public setPageSize(value: number) {
    this.pageSizeSubject.next(value);
  }

  public get pageCount() {
    let count = Math.ceil(this.totalCountSubject.getValue()
      / this.pageSizeSubject.getValue());
    if (isNaN(count)) {
      return 0;
    }
    return count;
  }

  public setCurrentPage(value: number) {
    this.currentPageSubject.next(value);
  }

  constructor(resource: Resource<TDocument>,
              public options: DataSourceOptions) {
    super(resource);
    this.totalCountSubject = new BehaviorSubject<number>(0);
    this.pageSizeSubject = new BehaviorSubject<number>(50);
    this.currentPageSubject = new BehaviorSubject<number>(1);
    this.pageInfo = new Subject<PageInfo>();
    //this.loadingSubject = new Subject<boolean>();

    this.currentPageSubject
      .distinctUntilChanged()
      .subscribe((currentPage) => {
        this.pageInfo.next({
          size: this.pageSizeSubject.getValue(),
          index: currentPage
        });
      });
    this.pageSizeSubject
      .distinctUntilChanged()
      .subscribe((pageSize) => {
        let pageCount = this.pageCount;
        if (pageCount > 0 &&
          this.currentPageSubject.getValue() > pageCount) {
          // fix current page since it is out of range
          this.currentPageSubject.next(pageCount);
        }
        this.pageInfo.next({
          size: pageSize,
          index: this.currentPageSubject.getValue()
        });
      });

    this.pageInfo
      .debounceTime(300)
      .switchMap(pageInfo => this.readPage(pageInfo))
      .subscribe((data) => this.onRead(data),
        error => {
          console.error(error);
          this.loading = false;
        });

    this.pageInfo.next({
      size: this.pageSizeSubject.getValue(),
      index: this.currentPageSubject.getValue()
    });
  }

  private readPage(pageInfo: PageInfo): Observable<QueryResult> {
    //console.log(pageInfo);
    //this.loadingSubject.next(true);
    this.loading = true;
    let query = {};
    if (this.options.paginate) {
      Object.assign(query, {
        page: pageInfo.index,
        limit: pageInfo.size
      });
    }
    let req = this.resource.queryPage(query);
    return req;
  }

  private onRead(data) {
    if (this.options.paginate) {
      if (!data.docs) {
        console.log('data.docs undefined');
        return;
      }
      this.documentsSubject.next(data.docs);
      this.totalCountSubject.next(data.total);
    } else {
      this.documentsSubject.next(data);
      this.totalCountSubject.next(data.length);
    }
    this.loading = false;
  }

  private currentPageSubject: BehaviorSubject<number>;
  private pageSizeSubject: BehaviorSubject<number>;
  private totalCountSubject: BehaviorSubject<number>;
  private pageInfo: Subject<PageInfo>;
}
