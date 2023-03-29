import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFacadeService } from "../../pages/auth/auth.facade.service";
import { ProjectsService } from "../../core/services/projects.service";
import { Observable, Subject } from "rxjs";
import { Project } from "../../core/interfaces";
import { ProjectFacade } from "../../core/facades/project.facade";
import { Router } from "@angular/router";
import { FormControl } from '@angular/forms';
import {Store} from "@ngrx/store";
import {loadProjects, ProjectStateModule, setProject} from "../../store";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {


  sub$ = new Subject()
  projects = []
  disableSelect = new FormControl(false);
  currentProjectId?: Project;




  currentProject?: Project; //= this.projectFacade.getProject()
  projects$ = this.store.select(state => state.project.projects)
  constructor(
    private authFacadeService: AuthFacadeService,
    private projectsService: ProjectsService,
    private projectFacade: ProjectFacade,
    private router: Router,
    private store: Store<{project: ProjectStateModule}>
  ) { }

  get project(): Project {
    return this.projectFacade.getProject()
  }



  ngOnInit(): void {


    const id: number = this.project.id;

    console.log(this.project)
    this.getMyProjects();
    this.projectFacade.getProjectFromService(id).subscribe((res) => {
      this.currentProject = res;
      console.log(this.currentProject)
    })

this.store.dispatch(loadProjects())

  }

  refreshPage() {
    setTimeout(() => {
      window.location.reload();
    }, 700);
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
