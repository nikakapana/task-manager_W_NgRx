import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectFacade } from 'src/app/core/facades/project.facade';
import { Board } from 'src/app/core/interfaces/board';
import { User } from 'src/app/core/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from 'src/app/pages/user/components/user-add-edit/user-add-edit.component';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectUsersComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'firstName', 'lastName', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<Board>();

  sub$ = new Subject();

  projectUserIds: number[] =[];

  chooseUserActive = false;

  userForm: FormGroup = new FormGroup({
    userId: new FormControl(null, [Validators.required])
  })

  users$: Observable<User[]> = this.userService.getAllUsers()

  get projectId() {
    return this.projectFacade.getProject().id;
  }


  constructor(
    private projectsService: ProjectsService,
    private projectFacade: ProjectFacade,
    private userService: UserService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) { }



  ngOnInit(): void {
    this.spinner.show()
    this.getProjectUsers()
  }

  getProjectUsers() {
    this.projectsService.getProjectUsersByProjectId(this.projectId).pipe(takeUntil(this.sub$)).subscribe(users => {
        this.projectUserIds = users.map((user: User) => user.id)
        this.dataSource.data = users
      this.spinner.hide()
      }
    )
  }


  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

  delete(id: number) {
    const userIds = this.projectUserIds.filter((userId: number) => userId !== id);
    this.projectsService.addProjectUser({
      projectId: this.projectId,
      userIds
    }).pipe(takeUntil(this.sub$)).subscribe(() => {
      this.getProjectUsers()
    })
  }

  chooseUser() {
    this.chooseUserActive = !this.chooseUserActive
  }

  onSubmit() {
    const userIds = [...this.projectUserIds, this.userForm.value.userId];

    this.createUsers(userIds).subscribe(() => {
      this.getProjectUsers();
      this.chooseUser();
    })


  }

  createUsers(userIds: number[]) {
    return this.projectsService.addProjectUser({
      projectId: this.projectId,
      userIds
    })
    .pipe(takeUntil(this.sub$))

  }

  addNewUser(){
    const dialog = this.dialog.open(UserAddEditComponent);

    dialog.afterClosed().pipe().subscribe((result: User) => {
      if (result) {
        const userIds = [...this.projectUserIds, result.id]
        this.createUsers(userIds).subscribe(() => {
          this.getProjectUsers();
          this.chooseUserActive = false;
        })
      }
    })
  }

}
