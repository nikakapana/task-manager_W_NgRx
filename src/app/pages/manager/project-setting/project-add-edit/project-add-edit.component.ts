import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProjectsService } from "../../../../core/services/projects.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, switchMap, takeUntil, tap } from "rxjs";
import { MatLegacySnackBar as MatSnackBar } from "@angular/material/legacy-snack-bar";
import { ProjectFacade } from "../../../../core/facades/project.facade";



@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.scss']
})
export class ProjectAddEditComponent implements OnInit, OnDestroy {


  sub$ = new Subject()
  projectId!: number

  constructor(
    private projectsService: ProjectsService,
    private projectFacade: ProjectFacade,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
  }


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.projectId = +params['id'];
        this.projectsService.getProject(+params['id']).subscribe(res => {
          this.form.patchValue(res)
        })
      }
    })

  }


  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    abbreviation: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
  }
  )

  errorMessage?: string

  submit() {
    this.form.markAllAsTouched()

    if (this.form.invalid) return

    else {

      if (this.projectId) {
        this.projectsService.updateProject(this.form.value)
          .pipe(
            takeUntil(this.sub$),
            tap((res) => this.projectFacade.setProject(res.id)),
            switchMap(() => this.projectFacade.getMyProjects$())
          )
          .subscribe(res => {

            this._snackBar.open('Project updated', 'Close', {
              duration: 2000,
            })

            this.router.navigate(['/projects/setting']).then();
          });
        return;
      } else {
        this.projectsService.createProject(this.form.value)
          .pipe(
            takeUntil(this.sub$),
            tap((res) => this.projectFacade.setProject(res.id)),
            switchMap(() => this.projectFacade.getMyProjects$())
          )
          .subscribe(res => {

            this._snackBar.open('Project created', 'Close', {
              duration: 2000,
            })

            this.router.navigate(['/projects/setting']).then();
          });
      }
    }
  }
  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
