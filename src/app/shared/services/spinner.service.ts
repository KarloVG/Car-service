import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  spinner = new BehaviorSubject<boolean>(false);

  constructor() {}

  spinnerToggle(boolean: boolean){
    this.spinner.next(boolean)
  }

}
