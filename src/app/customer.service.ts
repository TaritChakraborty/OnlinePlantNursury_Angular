import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'src/app/address';
import { Observable } from 'rxjs';
import { Customer } from './customer';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _baseUrl = 'http://localhost:3090/customer';
  loggedCustomer = {} as Customer;

  constructor(private _http: HttpClient) { }

  getCustomer(username: string, password: string): Observable<Customer> {
    return this._http.get<Customer>(`${this._baseUrl}/login/${username}/${password}`);
  }
  validateCustomer(username: string, password: string): Observable<boolean> {
    console.log(username, password);
    return this._http.get<boolean>(`${this._baseUrl}/validate/${username}/${password}`);
  }

  getOrders(): Observable<Customer> {
    return this._http.get<Customer>(`${this._baseUrl}/orders`);
  }

  getLastOrder(): Observable<Order> {
    return this._http.get<Order>(`${this._baseUrl}/lastOrder`);
  }

  addCustomer(customer: Customer): Observable<Object> {
    return this._http.post(`${this._baseUrl}/customer`, customer);
  }

  updateAddress(address: Address): Observable<Address> {
    return this._http.put<Address>(`${this._baseUrl}/address`, address);
  }

  updatePassword(customer: Customer): Observable<Customer> {
    return this._http.put<Customer>(`${this._baseUrl}/customer`, customer);
  }

  logout(): Observable<String> {
    return this._http.get<String>(`${this._baseUrl}/logout`);
  }

  deleteCustomer(): Observable<any> {
    return this._http.delete(`${this._baseUrl}/customer`, { responseType: 'text' });
  }
}
