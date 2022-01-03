import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  loading$ = new Observable<boolean>();

  constructor(
    private _spinnerService: SpinnerService
  ) { 
    this.loading$ = this._spinnerService.spinner;
  }

  ngOnInit(): void {
  }

}
