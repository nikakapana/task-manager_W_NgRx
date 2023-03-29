import {Injectable} from "@angular/core";
import {Actions} from "@ngrx/effects";
import {ProjectsService} from "../../core/services/projects.service";


@Injectable()

export class ProjectEffect {
  constructor(
    private actions$: Actions,
  private projectService: ProjectsService
  ) {
  }
}
