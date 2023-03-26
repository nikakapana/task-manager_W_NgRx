import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '../../../../core/services/board.service';
import { MatTabGroup } from '@angular/material/tabs';
import { TaskStatus } from 'src/app/core/enums/task-status.enum';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-add-edit',
  templateUrl: './board-add-edit.component.html',
  styleUrls: ['./board-add-edit.component.scss']
})
export class BoardAddEditComponent implements OnInit {

  constructor(
    private readonly boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  boardId!: number;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      if (params['id']) {
        this.boardId = +params['id'];
        this.getBoard();
      }
    })
  }



  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    position: new FormControl(1),
    columns: new FormArray([], Validators.required)
  })

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  get columnsFormArray() {
    return this.form.get('columns') as FormArray;
  }



  taskStatuses = Object.values(TaskStatus);

  addColumn() {
    if (!this.form.controls['description'].hasError('required') && !this.form.controls['name'].hasError('required')) {
      this.tabGroup.selectedIndex = 1;
    }


    this.columnsFormArray.push(new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      position: new FormControl(this.columnsFormArray.length + 1, Validators.required),
      taskStatus: new FormControl(TaskStatus.ToDo, Validators.required)
    }, Validators.required));
  }

  getBoard() {
    this.boardService.getBoard(this.boardId).subscribe(res => {
      this.form.patchValue(res)
      res.columns.forEach(column => {
        this.columnsFormArray.push(new FormGroup({
          id: new FormControl(column.id),
          name: new FormControl(column.name, Validators.required),
          description: new FormControl(column.description, Validators.required),
          position: new FormControl(column.position, Validators.required),
          taskStatus: new FormControl(column.taskStatus, Validators.required)
        }, Validators.required));
      })
    })
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    if (this.boardId) {

      this.boardService.updateBoard(this.form.value).subscribe(res => {
        console.log(res)
        this.router.navigate(['/projects/setting/boards']).then();
      })
    } else {
      this.boardService.createBoard(this.form.value)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/projects/setting/boards']).then();
        })
    }


  }

  close() {
    this.router.navigate(['/projects/setting/boards']).then();
  }

  drop(event: CdkDragDrop<any, any>) {
    moveItemInArray(this.columnsFormArray.controls, event.previousIndex, event.currentIndex);
    console.log(this.columnsFormArray.controls)
    this.columnsFormArray.controls.forEach((control, index) => {
      control.get('position')?.setValue(index + 1)
    })
  }
}
