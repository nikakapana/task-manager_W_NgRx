import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFacadeService } from "../../pages/auth/auth.facade.service";
import { ProjectsService } from "../../core/services/projects.service";
import { Subject } from "rxjs";
import { ProjectFacade } from "../../core/facades/project.facade";
import { Router } from "@angular/router";
import {Store} from "@ngrx/store";
import {initCurrentProject, loadProjects, ProjectStateModule, setProject} from "../../store";
import {currentProject} from "../../store/project/project.selector";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {


  sub$ = new Subject()
  projects = []





  currentProject?: any = this.store.select(currentProject);
  projects$ = this.store.select(state => state.project.projects)
  constructor(
    private authFacadeService: AuthFacadeService,
    private projectsService: ProjectsService,
    private projectFacade: ProjectFacade,
    private router: Router,
    private store: Store<{project: ProjectStateModule}>
  ) { }



  ngOnInit(): void {




this.store.dispatch(loadProjects())
    this.store.dispatch(initCurrentProject())

  }


  get userIsAuthenticated() {
    return this.authFacadeService.token
  }
  getMyProjects() {
    this.store.dispatch(loadProjects())
  }

  signOut() {
    this.authFacadeService.signOut()
  }



  selectProject(projectId: any) {

    this.store.dispatch(setProject({projectId}))
    // this.projectFacade.setProject(projectId);
    //
    // this.currentProjectId = projectId;
    // this.projectFacade.getProjectFromService(projectId).subscribe((res) => {
    //   this.currentProject = res;
    //   console.log(this.currentProject)
    // })
    // console.log(this.currentProject)
// this.refreshPage()
  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()

  }
}
