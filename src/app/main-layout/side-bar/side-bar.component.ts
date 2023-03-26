import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from "../../pages/auth/auth.facade.service";


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {


  panelOpenState = false;
  constructor(
    private authFacadeService: AuthFacadeService,

  ) { }

  ngOnInit(): void {

  }

  get userIsAuthenticated() {
    return this.authFacadeService.token
  }

}
