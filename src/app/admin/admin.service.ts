import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../admin';
import { Customer } from '../customer';
import { Plant } from '../plant';
import { Planter } from '../planter';
import { Seed } from '../seed';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _baseUrl = "http://localhost:3090/admin";
  private _customerBaseUrl = "http://localhost:3090/admin/customer";
  private _plantBaseUrl = "http://localhost:3090/admin/plant";
  private _planterBaseUrl = "http://localhost:3090/admin/planter";
  private _seedBaseUrl = "http://localhost:3090/admin/seed";

  //....................................Admin operations........................................
  constructor(private httpClient: HttpClient) { }
  getAdmin(username: string, password: string): Observable<Admin> {
    return this.httpClient.get<Admin>(`${this._baseUrl}/login/${username}/${password}`);
  }

  logout(): Observable<String> {
    return this.httpClient.get<String>(`${this._baseUrl}/logout`);
  }

  validateAdmin(username: string, password: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this._baseUrl}/validate/${username}/${password}`);
  }

  //.....................................Customer Operations.....................................
  getCustomerList(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this._customerBaseUrl}`)
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this._customerBaseUrl}/${id}`);
  }

  getOrder(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this._baseUrl}/orders/${id}`);
  }

  updateCustomer(id: number, customer: Customer): Observable<Object> {
    return this.httpClient.patch(`${this._customerBaseUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<Object> {
    return this.httpClient.delete(`${this._customerBaseUrl}/${id}`);
  }

  //...................................Plant Operations.........................................
  getPlantList(): Observable<Plant[]> {
    return this.httpClient.get<Plant[]>(`${this._plantBaseUrl}`);
  }

  createPlant(plant: Plant): Observable<Object> {
    return this.httpClient.post(`${this._plantBaseUrl}`, plant);
  }

  getPlantById(id: number): Observable<Plant> {
    return this.httpClient.get<Plant>(`${this._plantBaseUrl}/${id}`);
  }

  updatePlant(id: number, plant: Plant): Observable<Object> {
    return this.httpClient.put(`${this._plantBaseUrl}/${id}`, plant);
  }

  deletePlant(id: number): Observable<Object> {
    return this.httpClient.delete(`${this._plantBaseUrl}/${id}`);
  }

  //.....................................Planter Operations....................................
  getPlanterList(): Observable<Planter[]> {
    return this.httpClient.get<Planter[]>(`${this._planterBaseUrl}`);
  }

  createPlanter(planter: Planter): Observable<Object> {
    return this.httpClient.post(`${this._planterBaseUrl}`, planter);
  }
  getPlanterById(id: number): Observable<Planter> {
    return this.httpClient.get<Planter>(`${this._planterBaseUrl}/${id}`);
  }
  updatePlanter(id: number, planter: Planter): Observable<Object> {
    return this.httpClient.patch(`${this._planterBaseUrl}/${id}`, planter);
  }

  deletePlanter(id: number): Observable<Object> {
    return this.httpClient.delete(`${this._planterBaseUrl}/${id}`);
  }

  //............................................Seed operations...........................................
  getSeedList(): Observable<Seed[]> {
    return this.httpClient.get<Seed[]>(`${this._seedBaseUrl}`);
  }

  createSeed(seed: Seed): Observable<Object> {
    return this.httpClient.post(`${this._seedBaseUrl}`, seed);
  }
  getSeedById(id: number): Observable<Seed> {
    return this.httpClient.get<Seed>(`${this._seedBaseUrl}/${id}`);
  }
  updateSeed(id: number, seed: Seed): Observable<Object> {
    return this.httpClient.patch(`${this._seedBaseUrl}/${id}`, seed);
  }

  deleteSeed(id: number): Observable<Object> {
    return this.httpClient.delete(`${this._seedBaseUrl}/${id}`);
  }


}
