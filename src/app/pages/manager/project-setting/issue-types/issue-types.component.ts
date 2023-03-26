import { Component, OnInit } from '@angular/core';
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {IssueTypeService} from "../../../../core/services/issue-type.service";
import {ConfirmationPopUpComponent} from "../../../../shared/contirmation-pop-up/confirmation-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-issue-types',
  templateUrl: './issue-types.component.html',
  styleUrls: ['./issue-types.component.scss']
})
export class IssueTypesComponent implements OnInit {
  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  dataSource: any[] = []

  sub$ = new Subject();

  constructor(
    private issueTypeService: IssueTypeService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {

  }


  ngOnInit(): void {
    this.spinner.show()
    this.getIssueTypes();
  }

  getIssueTypes() {
    this.issueTypeService.getIssueTypes()
      .pipe(takeUntil(this.sub$))
      .subscribe(IssueType => {
        this.dataSource = IssueType;
        this.spinner.hide()
      });
  }



  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

  deleteIssueType(id: number) {
    const dialogRef = this.dialog.open(ConfirmationPopUpComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.issueTypeService.deleteIssueType(id);
          }
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.getIssueTypes();
        }
      });
  }
}
