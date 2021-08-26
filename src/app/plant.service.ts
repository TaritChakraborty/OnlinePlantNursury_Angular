import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plant } from './plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPlants(): Observable<Plant[]>{
    return this.http.get<Plant[]>(`${this.apiServerUrl}/plant/view`);
  }

 
}
