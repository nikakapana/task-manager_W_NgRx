import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {RoleService} from "../../../core/services/role.service";

import {PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Role} from "../../../core/interfaces/role";
import {PaginationResponse} from "../../../core/interfaces/pagination-response";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit{
  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<Role>();

  sub$ = new Subject();

  pageIndex  = 1;
  total = 0;
  pageSize = 10;


  constructor(
    private roleService: RoleService,
    private spinner: NgxSpinnerService

  ) {

  }

  ngOnInit(): void {
    this.spinner.show()
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRoles({
      page: this.pageIndex,
      limit: this.pageSize
    })
      .subscribe(roles => {
        console.log(roles)
        if (this.dataSource) {
          this.dataSource.data = roles.data;
          this.total = roles.totalCount;
        }
        this.spinner.hide()
      });

  }

  addRole(id?: number) {
    console.log(id)
  }

  delete(id: number) {

  }

  pageEvent($event: PageEvent) {
    console.log($event)
    this.pageIndex = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getRoles()
  }

  setPermissions(id: number) {
    console.log(id)
  }
}
