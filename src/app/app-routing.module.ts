import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { 
    path: 'warehouse', 
    loadChildren: () => import('../app/warehouse/warehouse.module').then(m => m.WarehouseModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
