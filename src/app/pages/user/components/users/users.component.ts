import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { of, Subject, takeUntil, switchMap } from 'rxjs';
import { User } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmationPopUpComponent } from '../../../../shared/contirmation-pop-up/confirmation-pop-up.component';
import { UserAddEditComponent } from '../user-add-edit/user-add-edit.component';
import { UserRoleComponent } from '../user-role/user-role.component';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns = ['id', 'fullName', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<User>();

  sub$ = new Subject();

  total = 0;
  pageIndex = 1;
  pageSize = 10;



  constructor (
    private userService: UserService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService

  ) {}


  ngOnInit(): void {
    this.spinner.show()
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers({
      page: this.pageIndex,
      limit: this.pageSize
    }).subscribe( users => {
      this.dataSource.data = users.data;
      this.total = users.totalCount;
      this.spinner.hide()

    })
  }

  addUser(id?: number){
    const dialogRef = this.dialog.open(UserAddEditComponent, {
      data: {
        userId: id
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers()
      }
    })
  }


  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmationPopUpComponent);

    dialogRef.afterClosed().pipe(takeUntil(this.sub$), switchMap((result) => {
      if (result) {
        return this.userService.deleteUser(id)
      }

      return of (null)
    })).subscribe(result => {
      if (result){
        this.getUsers()
      }
    })
  }

  pageEvent($event: PageEvent) {
    console.log($event);

    this.pageIndex = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getUsers()
  }

  setRole(user: User) {
    const dialogRef = this.dialog.open(UserRoleComponent, {
      data: {
        user: user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers()
      }
    })
  }
}
