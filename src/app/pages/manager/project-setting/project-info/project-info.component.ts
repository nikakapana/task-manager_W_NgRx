import { Component, OnInit } from '@angular/core';
import { ProjectFacade } from "../../../../core/facades/project.facade";
import { Project } from "../../../../core/interfaces";

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {


  get project(): Project {
    return this.projectFacade.getProject()
  }
  constructor(
    private projectFacade: ProjectFacade
  ) { }

  ngOnInit(): void {

  }



}
