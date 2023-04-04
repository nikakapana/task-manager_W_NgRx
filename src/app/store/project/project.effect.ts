import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProjectsService} from "../../core/services/projects.service";
import {
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess,
  initCurrentProject
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


}
