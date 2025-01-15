import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Adjust baseUrl to your actual backend endpoint
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  /**
   * Sign up new user
   * Endpoint: POST /api/auth/signup
   * Expects: { name, email, password }
   */
  signup(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  /**
   * Login existing user
   * Endpoint: POST /api/auth/login
   * Expects: { email, password }
   */
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  /**
   * Store token in localStorage or sessionStorage
   */
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  /**
   * Retrieve token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Check if user is currently logged in
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Log out user (remove token)
   */
  logout(): void {
    localStorage.removeItem('authToken');
    // Optionally call backend logout endpoint if necessary
  }
}
