import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, catchError, finalize, map, take } from 'rxjs';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { SpinnerService } from '../shared/services/spinner.service';
import { DashboardColumns } from './columns/dashboard-columns';
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component';
import { IResponse } from './interface/response';
import { IStatus } from './interface/status';
import { ITask } from './interface/task';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = DashboardColumns;
  todaysDate = new Date();
  today = new Date(this.todaysDate.getFullYear(), this.todaysDate.getMonth(), this.todaysDate.getDate(), 0,0,0).toISOString();
  showToday: boolean = true;
  tasks = new MatTableDataSource<ITask>();
  filteredTasks = new MatTableDataSource<ITask>();
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  @ViewChild(MatSort) sort!: MatSort;
  pipe = new DatePipe('en-US')

  constructor(
    private _dashboardService: DashboardService,
    private _matDialog: MatDialog,
    private _spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.loadingSubject.next(true)
    this._dashboardService.getTasks().pipe(map(data => {
      return data.map((response: IResponse) => {
        return {
          id: response.payload.doc.id,
          brand: response.payload.doc.data().brand,
          date: response.payload.doc.data().date.toDate(),
          desription: response.payload.doc.data().description,
          job: response.payload.doc.data().job,
          licensePlate: response.payload.doc.data().licensePlate,
          model: response.payload.doc.data().model,
          status: response.payload.doc.data().status,
          title: response.payload.doc.data().title
        }
      })
    })).subscribe(data => {
      this.tasks.data = data;
      this.filteredTasks.data = this.tasks.data.filter(a => this.pipe.transform(this.today, 'dd/MM/yyyy')
      === this.pipe.transform(a.date, 'dd/MM/yyyy'))
      this.tasks.sort = this.sort});
      this.loadingSubject.next(false)
  }

  dateFilter(event: any){
    this.showToday = !this.showToday
  }

  changeStatus(status: IStatus){
    const data = {id: status.id, status: status.status};
    this._spinnerService.spinnerToggle(true)
    if(data.status == 'U dolasku'){
      data.status = 'U tijeku'
      this.editStatus(data);
    }
    else if(data.status == 'U tijeku'){
      data.status = 'Završeno'
      this.editStatus(data);
    }
    else{
      data.status = 'U dolasku'
      this.editStatus(data);
    }
  }

  editStatus(data: IStatus){
    this._dashboardService.editStatus(data).pipe(
      take(1),
      catchError(error => error),
      finalize(() => this._spinnerService.spinnerToggle(false))
    ).subscribe();
  }

  addOrEdit(row?: ITask){
    const dialog = this._matDialog;
   const dialogRef = this._matDialog.open(DashboardDialogComponent,  {
      disableClose: true,
      width: '700px',
      data: row ? row : null
    })
  }

  deleteTask(row : ITask){
    const dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      data: row
    })
    dialogRef.afterClosed().subscribe(a => {
      this._spinnerService.spinnerToggle(true)
      this._dashboardService.deleteTask(row.id).subscribe(() =>
        this._spinnerService.spinnerToggle(false)
      );
    })
  }
}
