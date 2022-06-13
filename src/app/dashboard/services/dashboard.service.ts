import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { IModel } from '../interface/model';
import { ITask } from '../interface/task';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IBrand } from '../interface/brand';
import { IStatus } from '../interface/status';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly CONTROLLER_NAME = 'tasks'

  constructor(
    private _http: HttpClient,
    private _firestore: AngularFirestore
  ) { }

    getTasks(): Observable<any>{
      return this._firestore.collection('tasks').snapshotChanges();
    }

    addTask(taskRequest: ITask): Observable<any>{
      return from(this._firestore.collection('tasks').add(taskRequest));
    }

    editTask(taskRequest: ITask): Observable<any>{
      return from(this._firestore.collection('tasks').doc(taskRequest.id).update(taskRequest));
    }

    editStatus(taskRequest: IStatus): Observable<any>{
      return from(this._firestore.collection('tasks').doc(taskRequest.id.toString()).update({status: taskRequest.status}))
    }

    deleteTask(id: string): Observable<any>{
      return from(this._firestore.collection('tasks').doc(id).delete());
    }

    getBrands(): Observable<any>{
      return this._firestore.collection('brands').snapshotChanges();
    }

    getModels(id: string): Observable<any>{
      return this._firestore.collection('model', ref=> ref.where('brandId', '==', `${id}`)).valueChanges();
    }
}
