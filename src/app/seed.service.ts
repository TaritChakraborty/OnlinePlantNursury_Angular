import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Seed } from './seed';

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getSeeds(): Observable<Seed[]>{
    return this.http.get<Seed[]>(`${this.apiServerUrl}/seed/view`);
  }
}
