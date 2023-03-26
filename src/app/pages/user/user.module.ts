import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserAddEditComponent } from './components/user-add-edit/user-add-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './components/users/users.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserRoleComponent } from './components/user-role/user-role.component';
import { MatSelectModule } from '@angular/material/select';
import {NgxSpinnerModule} from "ngx-spinner";




@NgModule({
  declarations: [
    UserAddEditComponent,
    UsersComponent,
    UserRoleComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,

        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,

        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        NgxSpinnerModule,

    ],
  exports: [
    UserAddEditComponent
  ]
})
export class UserModule { }
