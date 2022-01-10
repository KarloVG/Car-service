import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, finalize, take } from 'rxjs';
import { ITask } from 'src/app/dashboard/interface/task';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(
    private _dashboardService: DashboardService,
    private _dialog: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: ITask
  ) { }

  ngOnInit(): void {
  }

  deleteTask(row: ITask){
      this._dialog.close()

  }
}
