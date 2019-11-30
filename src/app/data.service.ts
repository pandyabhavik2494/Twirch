import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject<any>('initialState');

  constructor() { }

  changeState(myChange) {
    this.messageSource.next(myChange);
  }

  getState() {
    return this.messageSource.asObservable();
  }
}
