import { Component, OnInit } from '@angular/core';
import {ProjectsService} from "../../core/services/projects.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private projectsService: ProjectsService
  ) { }





  ngOnInit(): void {
  }




}
