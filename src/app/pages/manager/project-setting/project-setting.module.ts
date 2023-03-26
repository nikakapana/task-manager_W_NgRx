import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectSettingRoutingModule } from './project-setting-routing.module';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { ProjectBoardComponent } from './project-board/project-board.component';
import { IssueTypesComponent } from './issue-types/issue-types.component';
import { ProjectUsersComponent } from './project-users/project-users.component';
import { BoardAddEditComponent } from './board-add-edit/board-add-edit.component';
import { MatButtonModule } from "@angular/material/button";
import { IssueTypeAddEditComponent } from './issue-type-add-edit/issue-type-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { UserModule } from '../../user/user.module';
import {NgxSpinnerModule} from "ngx-spinner";



@NgModule({
  declarations: [
    ProjectInfoComponent,
    ProjectBoardComponent,
    IssueTypesComponent,
    ProjectUsersComponent,
    BoardAddEditComponent,
    IssueTypeAddEditComponent,
  ],
    imports: [
        CommonModule,
        ProjectSettingRoutingModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatSelectModule,
        MatDialogModule,
        MatExpansionModule,
        MatDividerModule,
        MatMenuModule,
        DragDropModule,
        MatTableModule,
        UserModule,
        NgxSpinnerModule

    ]
})
export class ProjectSettingModule { }
