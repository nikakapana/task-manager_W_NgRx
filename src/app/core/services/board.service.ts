import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../interfaces/board';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends BaseService {

  getBoards(): Observable<Board[]> {
    return this.get<Board[]>('board');
  }

  createBoard(data: any): Observable<Board> {
    return this.post<Board>('board', data);
  }
  getBoard(id: number): Observable<Board> {
    return this.get<Board>(`board/${id}`);
  }



  updateBoard(data: any): Observable<Board> {
    return this.put<Board>(`board/${data.id}`, data);
  }

  deleteBoard(id: number): Observable<any> {
    return this.delete(`board/${id}`);
  }

}
