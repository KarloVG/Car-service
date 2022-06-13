import { Component } from "@angular/core";
import { ToggleSidebarService } from "../services/toggle-sidebar.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private _toggleSidebarService: ToggleSidebarService
  ) { }

  toggleSidebar(){
    this._toggleSidebarService.toggle();
  }

}
