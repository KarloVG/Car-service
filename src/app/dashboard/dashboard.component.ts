import { DatePipe } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, catchError, finalize, Subject, take } from 'rxjs';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { DashboardColumns } from './columns/dashboard-columns';
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component';
import { ITask } from './interface/task';
import { DashboardService } from './services/dashboard.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, AfterContentInit {

  displayedColumns: string[] = DashboardColumns;
  dataSource = ELEMENT_DATA;
  // tasks!: ITask[];
  // todaysDate = Date.now();
  todaysDate = new Date();
  today = new Date(this.todaysDate.getFullYear(), this.todaysDate.getMonth(), this.todaysDate.getDate(), 0,0,0).toISOString();
  showToday: boolean = true;
  tasks = new MatTableDataSource<ITask>();
  filteredTasks = new MatTableDataSource<ITask>();
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  tasksubject$: Subject<boolean> = new Subject();
  @ViewChild(MatSort) sort!: MatSort;
  pipe = new DatePipe('en-US')

  constructor(
    private _dashboardService: DashboardService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.today = this.pipe.transform(this.todaysDate, 'dd/MM/yyyy')
    // this.today = new Date(this.todaysDate.getFullYear(), this.todaysDate.getMonth(), this.todaysDate.getDate(), 0,0,0).toISOString()
    console.log(this.today)
    this.tasksubject$.subscribe(res => {
      this.loadingSubject.next(true)
      this._dashboardService.getTasks().pipe(
        finalize(() => this.loadingSubject.next(false))
      ).subscribe(data => {
        this.tasks.data = data;
        this.filteredTasks.data = this.tasks.data.filter(a => this.today == a.date)
        // this.sort.sort({id: 'date', start: 'desc', disableClear: false})
        this.tasks.sort = this.sort;
      })
    })
    
  }

  ngAfterViewInit(): void {
    // this.tasksubject$.next(true)
    console.log(this.sort)
  }

  ngAfterContentInit(){
    this.tasksubject$.next(true);
  }

  dateFilter(){
    this.showToday = !this.showToday
  }

  changeStatus(a: any){
    this.loadingSubject.next(true);
    if(a.status == 'U dolasku'){
      a.status = 'U tijeku'
      this._dashboardService.editTask(a).pipe(
        take(1),
        catchError(error => error),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe()
    }
    else if(a.status == 'U tijeku'){
      a.status = 'Završeno'
      this._dashboardService.editTask(a).pipe(
        take(1),
        catchError(error => error),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe()
    }
    else{
      a.status = 'U dolasku'
      this._dashboardService.editTask(a).pipe(
        take(1),
        catchError(error => error),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe()
    }
  }

  addOrEdit(row?: ITask){
    const dialog = this._matDialog;
   const dialogRef = this._matDialog.open(DashboardDialogComponent,  {
      disableClose: true,
      width: '700px',
      data: row ? row : null
    })
  dialogRef.afterClosed().subscribe(a => {
     this.loadingSubject.next(true);
     this.tasksubject$.next(true);
   })
  }

  deleteTask(row : ITask){
    const dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      data: row
    })
    dialogRef.afterClosed().subscribe(a => {
      this.loadingSubject.next(true);
      this.tasksubject$.next(true);
    })
    // this.loadingSubject.next(true);
    // this._dashboardService.deleteTask(row).pipe(
    //   take(1),
    //   catchError(error => error),
    //   finalize(() => this.tasksubject$.next(true))
    // ).subscribe()
  }

}
