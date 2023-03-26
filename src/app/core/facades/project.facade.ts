import { Injectable } from '@angular/core';
import { Project } from "../interfaces";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ProjectsService } from "../services/projects.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectFacade {

  myProjects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  myProjects$ = this.myProjects.asObservable();


  constructor(
    private projectsService: ProjectsService
  ) {
  }

  setProject(projectId: number) {
    this.projectsService.getProject(projectId).subscribe(
      (project) => {
        localStorage.setItem('project', JSON.stringify(project));
        console.log(project)
      }
    );

  }

  getProjectFromService(projectId: number): Observable<Project> {
    return this.projectsService.getProject(projectId);
  }

  getProject(): Project {
    const project = localStorage.getItem('project');
    return project ? JSON.parse(project) : null;

  }





  getMyProjects$(): Observable<Project[]> {
    return this.projectsService.getMyProjects()
      .pipe(
        tap(projects => this.myProjects.next(projects))
      )
  }
}
