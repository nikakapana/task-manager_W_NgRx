import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {IssueType} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})


  export class IssueTypeService  extends BaseService{

  getIssueTypes(): Observable<IssueType[]> {
    return this.get<IssueType[]>('issue-type');
  }

  createIssueType(data: any): Observable<IssueType> {
    return this.post<IssueType>('issue-type', data);
  }

  updateIssueType(data: IssueType): Observable<IssueType> {
    return this.put<IssueType>(`issue-type/${data.id}`, data);
  }

  getIssueType(id: number): Observable<IssueType> {
    return this.get<IssueType>(`issue-type/${id}`);
  }

  deleteIssueType(id: number): Observable<any> {
    return this.delete(`issue-type/${id}`);
  }
}
