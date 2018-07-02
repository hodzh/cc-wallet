import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';

@Injectable()
export class Broadcast {
  public static get event(): Observable<any> {
    return this.eventSubject.asObservable();
  }

  public static emit(event: any) {
    this.eventSubject.next(event);
  }

  private static eventSubject: Subject<any>
    = new Subject<any>();
}
