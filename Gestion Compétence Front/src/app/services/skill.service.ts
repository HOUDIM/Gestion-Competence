import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private baseUrl = 'http://localhost:8080'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) {}

  createSkill(employeeId: number, skill: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/skills/${employeeId}`, skill);
  }

  getAllSkills(): Observable<any> {
    return this.http.get(`${this.baseUrl}/skills`);
  }

  getAllSkillsByEmployee(employeeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/skills/${employeeId}`);
  }

  getSkillById(skillId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/skills/${skillId}`);
  }

  updateSkill(skillId: number, updatedSkill: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/skills/${skillId}`, updatedSkill);
  }

  deleteSkill(skillId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/skills/${skillId}`);
  }
}
