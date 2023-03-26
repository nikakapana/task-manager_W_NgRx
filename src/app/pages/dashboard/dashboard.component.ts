import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardService} from "../../core/services/board.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{
  boards$ = this.boardService.getBoards();
  boardId: number | null = null;

sub$ = new Subject()
  constructor(
    private boardService: BoardService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
    this.boards$.pipe(takeUntil(this.sub$)).subscribe(() => {
      this.spinner.hide()
    })

  }

  ngOnDestroy(): void {
  this.sub$.next(null)
    this.sub$.complete()

  }





}
