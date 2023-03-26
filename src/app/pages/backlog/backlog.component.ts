import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationPopUpComponent } from 'src/app/shared/contirmation-pop-up/confirmation-pop-up.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subject, takeUntil, switchMap, of } from 'rxjs';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskAddEditComponent } from '../dashboard/task-add-edit/task-add-edit.component';
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-backlog',
  standalone: true,
    imports: [CommonModule, RouterModule, MatButtonModule, MatDialogModule, NgxSpinnerModule],
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit, OnDestroy {

  dataSource: any[] = []

  sub$ = new Subject();

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) { }

  addTask(taskId?: number) {
    const dialogRef = this.dialog.open(TaskAddEditComponent, {
      width: '600px',
      data: {
        isBacklog: true,
        taskId,
      }
    })
  }

  ngOnInit(): void {
    this.spinner.show()
    this.getBacklogTasks();
  }

  getBacklogTasks() {
    this.taskService.getTasks({ isBacklog: true })
      .pipe(takeUntil(this.sub$))
      .subscribe(task => {
        this.dataSource = task;
        this.spinner.hide()
      });
  }



  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

  deleteTask(id: number) {
    const dialogRef = this.dialog.open(ConfirmationPopUpComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.taskService.deleteTask(id);
          }
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.getBacklogTasks();
        }
      });
  }

}
