import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core"
import { MatDrawer } from "@angular/material/sidenav"
import { ToggleSidebarService } from "../services/toggle-sidebar.service"


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer')drawer!: MatDrawer

  constructor(
    private _toggleSidebarService: ToggleSidebarService
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this._toggleSidebarService.setDrawer(this.drawer)
  }

}
