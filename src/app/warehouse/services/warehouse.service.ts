import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IWarehouse } from '../interface/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(
    private _http: HttpClient
  ) { }


  getItems(): Observable<any>{
    const url: string = 'http://localhost:3000/items';
    return this._http.get<any>(url).pipe(
      map(res => res)
    )
  }

  addItem(itemRequest: IWarehouse): Observable<any> {
    const url = 'http://localhost:3000/items';
    return this._http.post<any>(url, itemRequest).pipe(
      map(res => res),
      catchError(error => error)
    )
  }

  editItem(itemRequest: IWarehouse): Observable<any>{
    const url = 'http://localhost:3000/items' + '/' + itemRequest.id;
    return this._http.put<any>(url,itemRequest).pipe(
      map(res => res),
      catchError(error => error)
    )
  }

  deleteItem(item: IWarehouse): Observable<any>{
    const url = 'http://localhost:3000/items' + '/' + item.id;
    return this._http.delete<any>(url).pipe(
      catchError(error => error)
    )
  }

  // getAllCars(): Observable<ICar[]>{
  //   const url = 'https://the-vehicles-api.herokuapp.com/brands';
  //   return this._http.get<ICar[]>(url).pipe(
  //     map(res => res)
  //   )
  // }

  getItemById(id: number): Observable<IWarehouse> {
    const url = 'http://localhost:3000/items' + '/' + id;
    return this._http.get<IWarehouse>(url).pipe(
      map(res => res)
    )

  }
}