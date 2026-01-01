import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  generateCaptcha() {
    return this.http.get<any>(`${environment.apiUrl}/CommonApi/GenerateCaptcha`);
  }
  getDashboard(stateCode: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/DashboardChart/Chart`, {
      stateCode: stateCode
    });
  }
  async login(data: any): Promise<any> {
    return await firstValueFrom(
      this.http.post<any>(`${environment.apiUrl}/Login/Login`, data)
    );
  }

}