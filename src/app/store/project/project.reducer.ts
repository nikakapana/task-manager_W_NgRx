import {createReducer, on} from "@ngrx/store";
import {
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess,
  setProject,
} from "./project.actions";
import {Project} from "../../core/interfaces";




export interface ProjectStateModule {
  projects: Project[];
  currentProject: Project | null
}

const initialState: ProjectStateModule = {
  projects: [],
  currentProject: null
}
export const projectReducer = createReducer(
  initialState,
  on(loadProjects, state => state),
  on(loadProjectsSuccess, (state, action) => {
    return {
      ...state,
      projects: action.data
    }
  }),
  on(loadProjectsFailure, (state, action) => state),
  on(setProject, (state, action) => {
    const project = state.projects.find((project) => project.id === action.projectId);
    project && localStorage.setItem('project', JSON.stringify(project));
    return {
      ...state,
      currentProject: project || null
    }
  })
)
