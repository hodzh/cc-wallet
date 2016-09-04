import { Resource } from './resource';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IDocument } from './document';

export class DataSource<TDocument extends IDocument> {
  public get documents(): Observable<TDocument[]> {
    return this.documentsSubject.asObservable();
  }

  public loading: boolean;

  constructor(public resource: Resource<TDocument>) {
    this.documentsSubject = new BehaviorSubject<TDocument[]>([]);
  }

  public remove(document): Observable<boolean> {
    this.loading = true;
    var req = this.resource.remove(document._id);
    req.subscribe(
      (res) => {
        if (res) {
          var rows = this.documentsSubject.getValue()
            .filter(item => item !== document);
          this.documentsSubject.next(rows);
        }
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
    return req;
  }

  public refresh(document): Observable<TDocument> {
    this.loading = true;
    var req = this.resource.get(document._id);
    req.subscribe(
      (doc) => {
        this.onDocumentChanged(doc);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
    return req;
  }

  public create(data): Observable<TDocument> {
    this.loading = true;
    var req = this.resource.create(data);
    req.subscribe(
      (doc) => {
        var rows = this.documentsSubject.getValue().concat(doc);
        this.documentsSubject.next(rows);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
    return req;
  }

  public update(document, data): Observable<TDocument> {
    this.loading = true;
    var req = this.resource.update(document._id, data);
    req.subscribe(
      (document) => {
        this.onDocumentChanged(document);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
    return req;
  }

  public read(): Observable<TDocument[]> {
    //this.loadingSubject.next(true);
    this.loading = true;
    let query = {};
    let req = this.resource.query(query);
    req.subscribe(
      (docs) => {
        this.documentsSubject.next(docs);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
    return req;
  }

  protected documentsSubject: BehaviorSubject<TDocument[]>;
  //private loadingSubject: Subject<boolean>;

  protected onDocumentChanged(doc) {
    var rows = this.documentsSubject.getValue()
      .map((row: TDocument) => {
        return row._id === doc._id? doc : row;
      });
    this.documentsSubject.next(rows);
  }
}
