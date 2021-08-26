import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Planter } from './planter';

@Injectable({
  providedIn: 'root'
})
export class PlanterService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPlanters(): Observable<Planter[]>{
    return this.http.get<Planter[]>(`${this.apiServerUrl}/planter/view`);
  }
}
