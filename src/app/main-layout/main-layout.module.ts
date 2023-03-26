import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RouterModule, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import {PermissionsDirective} from "../core/permission-directive/permissions.directive";



@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatTooltipModule,
    MatSelectModule,
    PermissionsDirective
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class MainLayoutModule { }
