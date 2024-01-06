import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Assuming your API is hosted at http://localhost:8080
const apiUrl = 'http://localhost:8080/tranings';

@Injectable({
  providedIn: 'root',
})
export class TraningService {
  constructor(private http: HttpClient) {}

  getAllTranings(): Observable<any[]> {
    return this.http.get<any[]>(apiUrl);
  }

  getTraningById(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/${id}`);
  }

  createTraning(traning: any): Observable<any> {
    return this.http.post(apiUrl, traning);
  }

  updateTraning(id: number, updatedTraning: any): Observable<any> {
    return this.http.put(`${apiUrl}/${id}`, updatedTraning);
  }

  deleteTraning(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/${id}`);
  }
}
