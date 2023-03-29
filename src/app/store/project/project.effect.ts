import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProjectsService} from "../../core/services/projects.service";
import {
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess,
  setProject,
  setProjectFailure,
  setProjectSuccess
} from "./project.actions";
import {catchError, map, of, switchMap} from "rxjs";


@Injectable()

export class ProjectEffect {
  constructor(
    private actions$: Actions,
    private projectService: ProjectsService
  ) {
  }

  loadProjects$ = createEffect( () => this.actions$.pipe(
    ofType(loadProjects),
    switchMap( () => this.projectService.getMyProjects().pipe(
      map((data) => loadProjectsSuccess({data}),
        catchError((error) => of(loadProjectsFailure({error}))))
    ))
  ))

setProject$ = createEffect( () => this.actions$.pipe(
  ofType(setProject),
  switchMap((action) => this.projectService.getProject(action.projectId).pipe(
    map((data) => setProjectSuccess({data})),
    catchError((error) => of(setProjectFailure({error})))
  ))
))

  setProjectSuccess = createEffect( () => this.actions$.pipe(
    ofType(setProjectSuccess),
    map((action) => {
      localStorage.setItem('project', JSON.stringify(action.data));
    })
  ), {dispatch: false})
}
