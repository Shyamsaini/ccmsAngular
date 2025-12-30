import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobaleventService {

   private clickSubject = new Subject<Event>();

  public click$ = this.clickSubject.asObservable();

  constructor() {}

  // Emit a click event
  emitClickEvent(event: Event): void {
    this.clickSubject.next(event);
  }
}
