import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, catchError, finalize, Subject, take } from 'rxjs';
import { ITask } from '../dashboard/interface/task';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { SpinnerService } from '../shared/services/spinner.service';
import { WarehouseColumns } from './columns/warehouse-columns';
import { IWarehouse } from './interface/warehouse';
import { WarehouseService } from './services/warehouse.service';
import { WarehouseDialogComponent } from './warehouse-dialog/warehouse-dialog.component';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit, AfterContentInit {

  displayedColumns: string[] = WarehouseColumns;
  @ViewChild('sampleForm') form!: NgForm
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  itemsSubject$: Subject<boolean> = new Subject();
  items = new MatTableDataSource<IWarehouse>();

  constructor(
    private _warehouseService: WarehouseService,
    private _matDialog: MatDialog,
    private _spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.itemsSubject$.subscribe(res => {
      this._spinnerService.spinnerToggle(true)
      this._warehouseService.getItems().pipe(
        finalize(() => this._spinnerService.spinnerToggle(false))
      ).subscribe(data => {
        this.items.data = data;
      })
    })
  }

  addOrEdit(row?: ITask) {
    const dialog = this._matDialog;
    const dialogRef = this._matDialog.open(WarehouseDialogComponent, {
      disableClose: true,
      width: '700px',
      data: row ? row : null
    })
    dialogRef.afterClosed().subscribe(a => {
      this._spinnerService.spinnerToggle(true)
    })
  }


  deleteTask(row: IWarehouse) {
    const dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      data: row
    })
    dialogRef.afterClosed().subscribe(a => {
      // this.loadingSubject.next(true);
      this._spinnerService.spinnerToggle(true)
      this._warehouseService.deleteItem(row).pipe(
        take(1),
        catchError(error => error),
        finalize(() => this._spinnerService.spinnerToggle(false))
      ).subscribe()
    })
  }

  ngAfterContentInit() {
    this.itemsSubject$.next(true);
  }

  // getItem(id: number) {
  //   // this.loadingSubject.next(true)
  //   this._warehouseService.getItemById(id).pipe(
  //     take(1),
  //     // finalize(() => this.loadingSubject.next(false))
  //   ).subscribe(models => {
  //     this.warehouseItems = models;
  //     console.log(this.warehouseItems)
  //   })
  // }

  // onSubmit() {
  //   console.log(this.warehouseItems)
  //   this._warehouseService.addItem(this.warehouseItems).pipe(
  //     tap(a => console.log(a)),
  //   ).subscribe();
  // }

}
