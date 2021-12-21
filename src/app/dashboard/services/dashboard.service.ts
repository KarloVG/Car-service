import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { ICar } from '../interface/car';
import { IModel } from '../interface/model';
import { ITask } from '../interface/task';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly CONTROLLER_NAME = 'tasks'

  constructor(
    private _http: HttpClient
  ) { }

    getTasks(): Observable<any>{
      const url: string = 'http://localhost:3000/tasks';
      console.log(url)
      return this._http.get<any>(url).pipe(
        map(res => res)
      )
    }

    addTask(taskRequest: ITask): Observable<any>{
      console.log('add task')
      const url = 'http://localhost:3000/tasks';
      return this._http.post<any>(url,taskRequest).pipe(
        map(res => res),
        catchError(error => error)
      )
    }

    editTask(taskRequest: ITask): Observable<any>{
      const url = 'http://localhost:3000/tasks' + '/' + taskRequest.id;
      return this._http.put<any>(url,taskRequest).pipe(
        map(res => res),
        catchError(error => error)
      )
    }

    deleteTask(task: ITask): Observable<any>{
      const url = 'http://localhost:3000/tasks' + '/' + task.id;
      return this._http.delete<any>(url).pipe(
        catchError(error => error)
      )
    }

    getAllCars(): Observable<ICar[]>{
      const url = 'https://the-vehicles-api.herokuapp.com/brands';
      return this._http.get<ICar[]>(url).pipe(
        map(res => res)
      )
    }

    getModelCars(id: number): Observable<IModel[]>{
      const url = 'https://the-vehicles-api.herokuapp.com/models?brandId=' + id;
      return this._http.get<IModel[]>(url).pipe(
        map(res => res)
      )
    }
}
