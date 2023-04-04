import {createSelector} from "@ngrx/store";


export const currentProject = createSelector(
  (state: any) => state.app.project.currentProject,
  (currentProject) => currentProject
)
