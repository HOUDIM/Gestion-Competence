import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080/employees'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getSkillsByEmployee(employeeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${employeeId}/skills`);
  }

  getTrainingsByEmployee(employeeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${employeeId}/trainings`);
  }

  getModelsByEmployee(employeeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${employeeId}/models`);
  }

  getEvaluationsByEmployee(employeeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${employeeId}/evaluations`);
  }
  updateEmployee(
    employeeUsername: string,
    updatedEmployee: any
  ): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/${employeeUsername}`,
      updatedEmployee
    );
  }
  deleteEmployee(employeeUsername: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${employeeUsername}`);
  }
  toggleBlockEmployee(employeeUsername: string): Observable<any> {
    return this.http.patch<any>(
      `${this.baseUrl}/${employeeUsername}/block`,
      null
    );
  }
}
