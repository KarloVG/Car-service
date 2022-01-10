import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DATE_FORMAT } from '../shared/date-format';
import { ChangeColorDirective } from './directives/change-color.directive';
import { SpinnerComponent } from '../shared/content-layout/spinner/spinner.component';



@NgModule({
  declarations: [DashboardDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ],
  entryComponents: [SpinnerComponent]
})
export class DashboardModule { }
