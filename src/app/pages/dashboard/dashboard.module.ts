import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BoardComponent } from './board/board.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {RouterModule} from "@angular/router";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
    TaskAddEditComponent
  ],
    imports: [
        CommonModule,
        MatDialogModule,
        DashboardRoutingModule,
        DragDropModule,
        ReactiveFormsModule,
        RouterModule,
        NgxSpinnerModule


    ]
})
export class DashboardModule { }
