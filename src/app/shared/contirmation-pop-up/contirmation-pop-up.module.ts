import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPopUpComponent } from './confirmation-pop-up.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    ConfirmationPopUpComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ConfirmationPopUpModule { }
