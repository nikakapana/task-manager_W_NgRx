import {Component, OnInit} from '@angular/core';
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {EpicService} from "../../../core/services/epic.service";
import {ConfirmationPopUpComponent} from "../../../shared/contirmation-pop-up/confirmation-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-project-epics',
  templateUrl: './project-epics.component.html',
  styleUrls: ['./project-epics.component.scss']
})
export class ProjectEpicsComponent implements OnInit{


  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  dataSource: any[] = []

  sub$ = new Subject();

  constructor(
    private epicService: EpicService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {

  }


  ngOnInit(): void {
    this.spinner.show()
    this.getEpics()
  }

  getEpics() {
    this.epicService.getEpics()
      .pipe(takeUntil(this.sub$))
      .subscribe(epics => {
        this.dataSource = epics;
        this.spinner.hide()
      });
  }





  deleteEpic(id: number) {
    const dialogRef = this.dialog.open(ConfirmationPopUpComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.epicService.deleteEpic(id);
          }
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.getEpics();
        }
      });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
