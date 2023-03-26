import { Component, Inject, OnInit } from '@angular/core';
import { TaskService } from "../../../core/services/task.service";
import { IssueTypeService } from "../../../core/services/issue-type.service";
import { EpicService } from "../../../core/services/epic.service";
import { BoardService } from "../../../core/services/board.service";
import { ProjectsService } from "../../../core/services/projects.service";
import { Board, Column } from "../../../core/interfaces/board";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import {Observable, of, Subject, switchMap, takeUntil} from "rxjs";
import { IssueType, User } from "../../../core/interfaces";
import { Epic } from "../../../core/interfaces/epic";
import { TaskPriority } from "../../../core/enums";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationPopUpComponent} from "../../../shared/contirmation-pop-up/confirmation-pop-up.component";

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.scss']
})
export class TaskAddEditComponent implements OnInit {


  sub$ = new Subject();
  boards$: Observable<Board[]> = this.boardService.getBoards();
  types$: Observable<IssueType[]> = this.issueTypeService.getIssueTypes();
  epics$: Observable<Epic[]> = this.epicService.getEpics();
  users$: Observable<User[]> = this.projectsService.getProjectUsers()
  priority = Object.values(TaskPriority)




  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    issueTypeId: new FormControl('select Issue Type', Validators.required),
    epicId: new FormControl('Epic'),
    priority: new FormControl('priority', Validators.required),
    assigneeId: new FormControl('Assign User'),
    reporterId: new FormControl('Reporter User', Validators.required),
    boardId: new FormControl(null),
    boardColumnId: new FormControl(null),
    isBacklog: new FormControl(false, Validators.required),
    taskStatus: new FormControl(this.data.column?.taskStatus || 'ToDo', Validators.required),
    taskProperty: new FormArray([])
  })





  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private issueTypeService: IssueTypeService,
    private epicService: EpicService,
    private boardService: BoardService,
    private projectsService: ProjectsService,
    public dialogRef: MatDialogRef<TaskAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number, boardId: number, column: Column, isBacklog: boolean, createdAt: any }
  ) {
  }





  get taskProperty() {
    return this.form.get('taskProperty') as FormArray
  }







  ngOnInit(): void {

    if (this.data.taskId) {
      this.getTask(this.data.taskId)
    } else {
      this.form.get('issueTypeId')?.valueChanges
        .pipe(takeUntil(this.sub$))
        .subscribe((issueTypeId: number) => {
          this.getIssueTypeProperties(issueTypeId)
        })
    }
    if (this.data.isBacklog) {
      this.form.patchValue({ isBacklog: this.data.isBacklog })
      this.form.get('boardId')?.clearValidators()
      this.form.get('boardColumnId')?.clearValidators()
    } else {
      this.form.get('boardId')?.setValidators(Validators.required)
      this.form.get('boardColumnId')?.setValidators(Validators.required)
    }
    this.form.get('boardId')?.updateValueAndValidity()
    this.form.get('boardColumnId')?.updateValueAndValidity()
    if (this.data.boardId) {
      this.form.patchValue({ boardId: this.data.boardId })
    }

    if (this.data.column) {
      this.form.patchValue({ boardColumnId: this.data.column.id })
    }

  }

  getIssueTypeProperties(issueTypeId: number) {
    this.issueTypeService.getIssueType(issueTypeId)
      .pipe(takeUntil(this.sub$))
      .subscribe(res => {
        this.taskProperty.clear();
        res.issueTypeColumns.forEach(property => {
          this.taskProperty.push(new FormGroup({
            id: new FormControl(null),
            name: new FormControl(property.name),
            filedName: new FormControl(property.filedName),
            value: new FormControl(null, property.isRequired ? Validators.required : null),
            isRequired: new FormControl(property.isRequired),
          }))
        })
      })
  }

  save() {
    console.log(this.form)
    this.form.markAllAsTouched()
    if (this.form.invalid) return;

    if (this.data.taskId) {
      this.taskService.updateTask(this.data.taskId, this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(res => {
          this.dialogRef.close(res)
        })
    } else {
      this.taskService.createTask(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(res => {
          this.dialogRef.close(res)
        })
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

  private getTask(taskId: number) {
    this.taskService.getTask(taskId)
      .pipe()
      .subscribe(res => {
        this.form.patchValue(res)
        res.taskProperty.forEach(property => {
          this.taskProperty.push(new FormGroup({
            name: new FormControl(property.name, Validators.required),
            filedName: new FormControl(property.fieldName, Validators.required),
            value: new FormControl(property.value, Validators.required),
            isRequired: new FormControl(property.isRequired, Validators.required),
          }))
        })
      })
  }


}
