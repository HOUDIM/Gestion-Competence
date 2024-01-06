import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  private baseUrl = 'http://localhost:8080'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) {}

  createEvaluation(skillId: number, evaluation: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/evaluations/${skillId}`, evaluation);
  }

  getAllEvaluations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/evaluations`);
  }

  getAllEvaluationsByEmployee(employeeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/evaluations/${employeeId}`);
  }

  getEvaluationById(evaluationId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/evaluations/${evaluationId}`);
  }

  updateEvaluation(
    evaluationId: number,
    upadtedEvaluation: any
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/evaluations/${evaluationId}`,
      upadtedEvaluation
    );
  }

  deleteEvaluation(evaluation: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/evaluations/${evaluation}`);
  }
}
