import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {Epic} from "../interfaces/epic";
import {PaginationResponse} from "../interfaces/pagination-response";

@Injectable({
  providedIn: 'root'
})
export class EpicService extends BaseService{

  getEpics(): Observable<Epic[]> {
    return this.get<Epic[]>('epics')
  }


  getEpic(id: number): Observable<Epic> {
    return this.get<Epic>(`epics/${id}`)
  }

  createEpic(epic: Epic): Observable<Epic> {
    return this.post<Epic>(`epics`, epic)
  }

  updateEpic(epic: Epic): Observable<Epic> {
    return this.put<Epic>(`epics/${epic.id}`, epic)
  }


  deleteEpic(id: number): Observable<any> {
    return this.delete(`epics/${id}`)
  }

}
