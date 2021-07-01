import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { environment }  from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrlOrders = environment.apiURL + 'orders/';
  constructor(private http: HttpClient) { }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.apiUrlOrders)
  }
  getOrder(orderId:string):Observable<Order>{
    return this.http.get<Order>(`${this.apiUrlOrders}/${orderId}`);
  }

  createOrder(order : Order):Observable<Order>{
    return this.http.post<Order>(this.apiUrlOrders,order);
  }

  deleteOrder(orderId:string):Observable<any>{
    return this.http.delete<any>(`${this.apiUrlOrders}/${orderId}`);
  }

  updateOrder(orderStaus: { status: string }, orderId?: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrlOrders}/${orderId}`, orderStaus);
  }

}
