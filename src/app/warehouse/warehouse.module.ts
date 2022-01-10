import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { WarehouseDialogComponent } from './warehouse-dialog/warehouse-dialog.component';


@NgModule({
  declarations: [
    WarehouseComponent,
    WarehouseDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    WarehouseRoutingModule
  ]
})
export class WarehouseModule { }
