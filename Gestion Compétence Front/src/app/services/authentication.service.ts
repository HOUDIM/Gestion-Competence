import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest, ISignupRequest } from '../types/auth.types';
export const BASE_URL = 'http://localhost:8080';
@Injectable({ providedIn: 'root' })
class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(loginData: ILoginRequest) {
    return this.http.post(`${BASE_URL}/auth/login/`, loginData);
  }

  register(signupData: ISignupRequest) {
    return this.http.post(`${BASE_URL}/auth/login/`, signupData);
  }
}
