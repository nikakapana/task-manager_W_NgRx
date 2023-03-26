import {Component, Inject, OnInit} from '@angular/core';
import {BoardService} from "../../../core/services/board.service";
import {ActivatedRoute} from "@angular/router";
import {Board, Column} from "../../../core/interfaces/board";
import {TaskService} from "../../../core/services/task.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskAddEditComponent} from "../task-add-edit/task-add-edit.component";
import * as _ from 'lodash';
import {Tasks} from "../../../core/interfaces/task";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Observable, of, switchMap, takeUntil} from "rxjs";
import {User} from "../../../core/interfaces";
import {ProjectsService} from "../../../core/services/projects.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ConfirmationPopUpComponent} from "../../../shared/contirmation-pop-up/confirmation-pop-up.component";
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],

})



export class BoardComponent implements OnInit {
  users$: Observable<User[]> = this.projectsService.getProjectUsers()
  boards$ = this.boardService.getBoards();
  tasks: any = {}

  dialogData: any;

  boardId!: number;
  board: Board = {} as Board;
currBoard = this.boardService.getBoard(this.boardId)
  selectedBoard: any;

  onBoardSelected(board: any) {
    this.selectedBoard = board;
  }
  constructor(
     private boardService: BoardService,
     private route: ActivatedRoute,
     public dialog: MatDialog,
     private taskService: TaskService,
     private projectsService: ProjectsService,
     private spinner: NgxSpinnerService


  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.boardId = +params['id']
        this.getBoard()
      }
    })
    this.onBoardSelected(this.boardId)
  }

  drop(event: CdkDragDrop<any>, column: Column) {
    console.log(event.container)

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const tasks: Tasks[] = event.container.data.map((task: Tasks, index: number) => {
        return {
          ...task,
          taskStatus: column.taskStatus,
          boardColumnId: column.id,
        }
      })

      this.tasks[column.id] = tasks
      const currentTask = tasks[event.currentIndex]
      console.log(currentTask)
      this.taskService.updateTask(currentTask.id, currentTask).subscribe(task => {

        this.getTasks()
      })
    }


  }

  getBoard() {
    this.boardService.getBoard(this.boardId).subscribe(board => {
      console.log(board)
      this.board = board
      this.getTasks()
      this.spinner.hide()
    })
  }




  addTask(column: Column) {

    const  dialogRef =  this.dialog.open(TaskAddEditComponent, {
      width: '600px',
      data: {
        boardId: this.boardId,
        column: column
      }
    });

    dialogRef.afterClosed().subscribe((task: Tasks) => {
      if (task) {
        this.getTasks()
      }
    })
  }

  private getTasks() {
    this.taskService.getTasks({boardId: this.boardId}).subscribe(tasks => {
      this.tasks = _.groupBy(tasks, 'boardColumnId')
      console.log(tasks)

    })
  }

  viewTask(task: Tasks, column: Column) {
    const  dialogRef = this.dialog.open(TaskAddEditComponent, {
      width: '600px',
      data: {
        boardId: this.boardId,
        column: column,
        taskId: task.id
      },
    });
    dialogRef.afterClosed().subscribe((task: Tasks) => {
      if (task) {
        this.getTasks()
      }
    })}


  deleteTask(id: number) {
    const dialogRef = this.dialog.open(ConfirmationPopUpComponent);

    dialogRef.afterClosed()
      .pipe(

        switchMap((result) => {
          if (result) {
            return this.taskService.deleteTask(id);
          }
          return of(null);
        })
      ).subscribe(result => {
      if (result) {
        this.getTasks();
      }
    });

  }

}
