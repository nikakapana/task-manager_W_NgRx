import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Board } from 'src/app/core/interfaces/board';
import { BoardService } from 'src/app/core/services/board.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent {

  boards$: Observable<Board[]> = this.boardService.getBoards();
  panelOpenState = false;
  constructor(
    private boardService: BoardService,
    private locationStrategy: LocationStrategy
  ) {
  }

  onAccordionClick(event: MouseEvent) {
    event.stopPropagation();
  }

  deleteBoard(id: number) {

    return this.boardService.delete(`board/${id}`).subscribe(res => {
      console.log(res);
      window.location.reload();
    });

  }


}
