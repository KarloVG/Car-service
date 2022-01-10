import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService implements OnInit {

  spinner = new BehaviorSubject<boolean>(false);

  constructor() {}

  ngOnInit(){
  }

  spinnerToggle(boolean: boolean){
    this.spinner.next(boolean)
  }

}
