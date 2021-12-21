import { Component, OnInit } from "@angular/core";
import { ToggleSidebarService } from "../services/toggle-sidebar.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _toggleSidebarService: ToggleSidebarService
  ) { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this._toggleSidebarService.toggle();
  }

}
