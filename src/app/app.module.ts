import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutModule } from "./main-layout/main-layout.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RouterModule, RouterOutlet } from "@angular/router";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { CookieService } from "ngx-cookie-service";
import { ProjectInterceptor } from "./core/interceptors/project.interceptor";
import { ProjectPageComponent } from './pages/manager/project-page/project-page.component';
import { ProjectSettingComponent } from './pages/manager/project-setting/project-setting.component';
import { ProjectEpicsComponent } from './pages/manager/project-epics/project-epics.component';
import { EpicAddEditComponent } from './pages/manager/epic-add-edit/epic-add-edit.component';
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { MatInputModule } from '@angular/material/input';
import { HotToastModule } from '@ngneat/hot-toast';
import { PermissionsDirective } from './core/permission-directive/permissions.directive';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {ProjectEffect, projectReducer} from "./store";





@NgModule({
  declarations: [
    AppComponent,
    ProjectPageComponent,
    ProjectSettingComponent,
    ProjectEpicsComponent,
    EpicAddEditComponent,
    UpdatePasswordComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    RouterOutlet,
    MatButtonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatInputModule,
    HotToastModule.forRoot({
      reverseOrder: true,
      dismissible: true,
      autoClose: true,
    }),
    NgxSpinnerModule,

    MatTableModule,
    PermissionsDirective,
    StoreModule.forRoot({
project: projectReducer
    }, {}),
    EffectsModule.forRoot([
ProjectEffect
    ])

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ProjectInterceptor,
      multi: true
    },
    CookieService,


  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
