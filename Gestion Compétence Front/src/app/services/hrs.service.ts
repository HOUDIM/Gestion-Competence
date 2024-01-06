import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HrsService {
  private baseUrl = 'http://localhost:8080/hr'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  getAllHrs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  updateHr(employeeUsername: string, updatedEmployee: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/${employeeUsername}`,
      updatedEmployee
    );
  }
  deleteHr(employeeUsername: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${employeeUsername}`);
  }
  toggleBlocHr(employeeUsername: string): Observable<any> {
    return this.http.patch<any>(
      `${this.baseUrl}/${employeeUsername}/block`,
      null
    );
  }
}
