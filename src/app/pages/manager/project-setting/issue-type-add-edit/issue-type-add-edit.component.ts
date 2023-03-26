import {Component, OnDestroy, OnInit} from '@angular/core';
import {IssueTypeEnum} from "../../../../core/enums";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {IssueTypeService} from "../../../../core/services/issue-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-issue-type-add-edit',
  templateUrl: './issue-type-add-edit.component.html',
  styleUrls: ['./issue-type-add-edit.component.scss']
})
export class IssueTypeAddEditComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    icon: new FormControl(null, Validators.required),
    color: new FormControl(1, Validators.required),
    type: new FormControl(null, Validators.required),
    issueTypeColumns: new FormArray([]),
  })
  issueTypes = Object.values(IssueTypeEnum);

  issueTypeId!: number;

  get columnsFormArray() {
    return this.form.get('issueTypeColumns') as FormArray;
  }

  constructor(
    private readonly issueTypeService: IssueTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  sub$ = new Subject()

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.issueTypeId = +params['id'];
        this.getIssueType()
        console.log(this.issueTypeId)
      }
    })
  }

  getIssueType() {
    this.issueTypeService.getIssueType(this.issueTypeId)
      .pipe(takeUntil(this.sub$))
      .subscribe(res => {
      this.form.patchValue(res)
      res.issueTypeColumns.forEach(column => {
        this.columnsFormArray.push(new FormGroup({
          id: new FormControl(column.id),
          name: new FormControl(column.name, Validators.required),
          filedName: new FormControl(column.filedName, Validators.required),
          isRequired: new FormControl(column.isRequired, Validators.required)
        }, Validators.required));
      })
    })
  }

  addColumn() {
    this.columnsFormArray.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      filedName: new FormControl(null, Validators.required),
      isRequired: new FormControl(false, Validators.required),
    }, Validators.required));
  }


  save() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return;
    }
    if (this.issueTypeId) {
      this.issueTypeService.updateIssueType(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe( res => {
          this.router.navigate(['/projects/setting/issue-types']).then()
        })
    } else {
      this.issueTypeService.createIssueType(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe( res => {
          this.router.navigate(['/projects/setting/issue-types']).then()
        })
    }


  }

  ngOnDestroy(): void {

    this.sub$.next(null)
    this.sub$.complete()
  }
}
