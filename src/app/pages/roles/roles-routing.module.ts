import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RolesComponent} from "./roles/roles.component";
import {PermissionAddEditComponent} from "./permission-add-edit/permission-add-edit.component";

const routes: Routes = [
  {
    path: '',
    component: RolesComponent
  },
  {
    path: 'permission/:roleId',
    component: PermissionAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
