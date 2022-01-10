import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, finalize, take } from 'rxjs';
import { IWarehouse } from '../interface/warehouse';
import { WarehouseService } from '../services/warehouse.service';

@Component({
  selector: 'app-warehouse-dialog',
  templateUrl: './warehouse-dialog.component.html',
  styleUrls: ['./warehouse-dialog.component.scss']
})
export class WarehouseDialogComponent implements OnInit {

  warehouseItems: IWarehouse = {
    name: '',
    pieces: null!
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public row: IWarehouse,
    private _warehouseService: WarehouseService,
    private _dialog: MatDialogRef<WarehouseDialogComponent>,
  ) { }

  ngOnInit(): void {
    if(this.row){
      this.warehouseItems = this.row
      console.log(this.warehouseItems)
    }
  }
  onSubmit() {
    if (this.row) {
      this._warehouseService.editItem(this.warehouseItems).pipe(
        take(1),
        catchError(error => error),
        finalize(() => this._dialog.close())
      ).subscribe()
    }
    else {
      this._warehouseService.addItem(this.warehouseItems).pipe(
        take(1),
        catchError(error => error),
        finalize(() => this._dialog.close())
      ).subscribe()
    }
  }

}
