import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BaseService} from "./base.service";
import {Tasks} from "../interfaces/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService{

  getTask(id: number): Observable<Tasks> {
    return this.get<Tasks>(`task/${id}`)
  }

  getTasks(params = {}): Observable<Tasks[]> {
    return this.get<Tasks[]>(`task`, params )
  }

  createTask(data: any): Observable<Tasks> {
    return this.post<Tasks>(`task`, data)
  }

  updateTask(id: number, data: any): Observable<Tasks> {
    return this.put<Tasks>(`task/${id}`, data)
  }

  deleteTask(id: number): Observable<any> {
    return this.delete<Tasks>(`task/${id}`)
  }
}
