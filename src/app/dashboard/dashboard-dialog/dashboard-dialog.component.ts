import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, finalize, map } from 'rxjs';
import { IBrand } from '../interface/brand';
import { IResponse } from '../interface/response';
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
  cars!: any;
  models!: any;
  todaysDate = Date.now();
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  pipe = new DatePipe('en-US')

  constructor(
    @Inject(MAT_DIALOG_DATA) public row: any,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialogRef<DashboardDialogComponent>,
    private _dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.setupFormGroup();
    this.getCarsDropdown();
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
    this._dashboardService.getBrands().pipe(map(data => {
      return data.map((response: IResponse) => {
        return {
          id: response.payload.doc.id,
          name: response.payload.doc.data().name
        }
      })
    }),
    ).subscribe(cars => 
      {
        this.cars = cars;
        if(this.row){
          this.selectedBrand(this.row.brand)
        }
      });
    this.loadingSubject.next(false)
  }

  getModelDropdown(id: string) {
    this._dashboardService.getModels(id).pipe(finalize(() => this.loadingSubject.next(false)))
    .subscribe(data => this.models = data);
  }

  
  selectedBrand(brand: IBrand): void {
    const brandId = this.cars.filter((data: { name: any; }) => data.name == brand)[0].id;
    this.getModelDropdown(brandId);
  }

  modifyBrand(){
    const brandName = this.taskGroup.get('brand')?.value;
    return this.cars.filter((data: any) => data.name == brandName);
  }

  modifyDate(){
    const date = this.taskGroup.get('date')?.value;
    return date.toDate();
  }

  onSubmit() {
    const dateControl = this.taskGroup.get('date');
    if (this.row.date != dateControl?.value){
      dateControl?.setValue(this.modifyDate())
    }
    if(this.row){
      this._dashboardService.editTask(this.taskGroup.value);
      this._dialog.close();
    } else {
      this._dashboardService.addTask(this.taskGroup.value);
      this._dialog.close();
    }
  }

  get licensePlate(): AbstractControl { return this.taskGroup.get('licensePlate')!; }
  get brand(): AbstractControl { return this.taskGroup.get('brand')!; }
  get model(): AbstractControl { return this.taskGroup.get('model')!; }
  get status(): AbstractControl { return this.taskGroup.get('status')!; }
}
