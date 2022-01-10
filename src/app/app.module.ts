import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { FooterComponent } from './shared/content-layout/footer/footer.component';
import { HeaderComponent } from './shared/content-layout/header/header.component';
import { SidebarComponent } from './shared/content-layout/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ChangeColorDirective } from './dashboard/directives/change-color.directive';
import { SpinnerComponent } from './shared/content-layout/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SidebarMenuComponent,
    DashboardComponent,
    ConfirmationDialogComponent,
    ChangeColorDirective,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
    
  ],
  exports: [MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
