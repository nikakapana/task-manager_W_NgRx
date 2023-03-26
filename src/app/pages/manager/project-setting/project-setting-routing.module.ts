import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectSettingComponent } from "./project-setting.component";
import { ProjectInfoComponent } from "./project-info/project-info.component";
import { ProjectBoardComponent } from "./project-board/project-board.component";
import { IssueTypesComponent } from "./issue-types/issue-types.component";
import { ProjectUsersComponent } from "./project-users/project-users.component";
import { BoardAddEditComponent } from "./board-add-edit/board-add-edit.component";
import { IssueTypeAddEditComponent } from "./issue-type-add-edit/issue-type-add-edit.component";
import { BoardComponent } from '../../dashboard/board/board.component';
import { ProjectEpicsComponent } from "../project-epics/project-epics.component";
import { EpicAddEditComponent } from "../epic-add-edit/epic-add-edit.component";
import { DashboardComponent } from '../../dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: ProjectSettingComponent,
  children: [
    {
      path: '',
      redirectTo: 'info',
      pathMatch: 'full'
    },
    {
      path: 'info',
      component: ProjectInfoComponent
    },
    {
      path: 'boards',
      children: [
        {
          path: '',
          component: ProjectBoardComponent
        },
        {
          path: 'add',
          component: BoardAddEditComponent
        },
        {
          path: 'edit/:id',
          component: BoardAddEditComponent
        },
        {
          path: ':id',
          component: BoardComponent
        }
      ]
    },
    {
      path: 'issue-types',
      children: [
        {
          path: '',
          component: IssueTypesComponent
        },
        {
          path: 'add',
          component: IssueTypeAddEditComponent
        },
        {
          path: 'edit/:id',
          component: IssueTypeAddEditComponent
        }
      ]
    }
    ,
    {
      path: 'epics',
      children: [
        {
          path: '',
          component: ProjectEpicsComponent
        },
        {
          path: 'add',
          component: EpicAddEditComponent
        },
        {
          path: 'edit/:id',
          component: EpicAddEditComponent
        }
      ]
    },
    {
      path: 'users',
      component: ProjectUsersComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectSettingRoutingModule { }
