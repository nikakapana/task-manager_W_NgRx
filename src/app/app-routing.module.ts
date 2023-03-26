import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import {PermissionGuard} from "./core/guards/permission.guard";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },

      {
        path: 'roles',
        canActivate: [PermissionGuard],
        data: {
          permissions: ['role:list']
        },
        loadChildren: () => import('./pages/roles/roles.module').then(m => m.RolesModule)
      },
      {
        path: 'projects',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/manager/projects/projects.module').then(m => m.ProjectsModule)
      },

      {
        path: 'users',
        canActivate: [PermissionGuard],
        data: {
          permissions: ['user:list']
        },
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'updatePassword',
        component: UpdatePasswordComponent
      },
      {
        path: 'backlog',
        loadComponent: () => import('./pages/backlog/backlog.component').then(m => m.BacklogComponent)
      }

    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
