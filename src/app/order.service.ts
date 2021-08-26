import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order = {} as Order;
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getOrder(): Order {
    return this.order;
  }

  setOrder(order: Order): void {

    this.order = order;
    console.log("order Service",this.order);
  }

  public addOrder(order: Order): Observable<Order> {
    console.log("orderServe", order);

    return this.http.post<Order>(`${this.apiServerUrl}/order/add`, order);
  }
}
