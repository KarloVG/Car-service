import { DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { BehaviorSubject, catchError, finalize, take, tap } from 'rxjs';
import { ICar } from '../interface/car';
import { IModel } from '../interface/model';
import { ITask } from '../interface/task';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-dialog',
  templateUrl: './dashboard-dialog.component.html',
  styleUrls: ['./dashboard-dialog.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
  ],
})
export class DashboardDialogComponent implements OnInit {

  taskGroup!: FormGroup;
  cars!: ICar[];
  models!: IModel[];
  todaysDate = Date.now();
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  pipe = new DatePipe('en-US')

  constructor(
    @Inject(MAT_DIALOG_DATA) public row: ITask,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialogRef<DashboardDialogComponent>,
    private _dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    // console.log(formatDate(this.todaysDate[0], 'dd-mm-yyyy', 'fr-FR'))
    console.log(this.pipe.transform(this.todaysDate, 'dd/MM/yyyy'))
    this.setupFormGroup();
    this.getCarsDropdown();
    this.brand.valueChanges.subscribe(id => {
      const carId = this.cars.find(a => id == a.brand)
      this.getModelDropdown(carId?.id!)
    })
  }

  setupFormGroup() {
    if (this.row) {
      this.taskGroup = this._formBuilder.group({
        id: [this.row.id],
        title: [this.row.title, Validators.required],
        brand: [this.row.brand, Validators.required],
        model: [this.row.model, Validators.required],
        job: [this.row.job, Validators.required],
        date: [this.row.date],
        licensePlate: [this.row.licensePlate, Validators.required],
        description: [this.row.description, Validators.required],
        status: [this.row.status]
      })
    }
    else {
      this.taskGroup = this._formBuilder.group({
        title: ['', Validators.required],
        brand: ['', Validators.required],
        model: ['', Validators.required],
        job: ['', Validators.required],
        date: [''],
        licensePlate: ['', [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{3,4}[A-Z]{1,2}$')]],
        description: [''],
        status: ['U dolasku']
      })
    }
  }

  getCarsDropdown() {
    this.loadingSubject.next(true)
    this._dashboardService.getAllCars().pipe(
      take(1),
      finalize(() => {
        this.loadingSubject.next(false)
        if(this.row){
          this.getModelDropdown(this.cars.find(a => this.row.brand == a.brand)?.id!)
        }
      })
    ).subscribe(cars => {
      this.cars = cars;
    })
  }

  getModelDropdown(id: number) {
    this.loadingSubject.next(true)
    this._dashboardService.getModelCars(id).pipe(
      take(1),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(models => {
      this.models = models;
    })
  }


  onSubmit() {
    console.log(this.taskGroup.value)
    if (this.row) {
      this._dashboardService.editTask(this.taskGroup.value).pipe(
        take(1),
        catchError(error => error),
        finalize(() => this._dialog.close())
      ).subscribe()
    }
    else {
      this._dashboardService.addTask(this.taskGroup.value).pipe(
        take(1),
        catchError(error => error),
        finalize(() => this._dialog.close())
      ).subscribe()
    }
  }

  get licensePlate(): AbstractControl { return this.taskGroup.get('licensePlate')!; }
  get brand(): AbstractControl { return this.taskGroup.get('brand')!; }
  get model(): AbstractControl { return this.taskGroup.get('model')!; }
  get status(): AbstractControl { return this.taskGroup.get('status')!; }
}
