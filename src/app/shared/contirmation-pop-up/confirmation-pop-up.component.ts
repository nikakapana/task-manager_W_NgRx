import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-pop-up',
  templateUrl: './confirmation-pop-up.component.html',
  styleUrls: ['./confirmation-pop-up.component.scss']
})
export class ConfirmationPopUpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopUpComponent>,
  ) { }

  ngOnInit(): void {
  }


}
