import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  /*=============================
   =          SIGNUP           =
   =============================*/
  signup(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  /*=============================
   =           LOGIN           =
   =============================*/
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  /*=============================
   =        TOKEN STORAGE      =
   =============================*/
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser'); // remove user info as well
    // Optionally call backend logout endpoint if necessary
  }

  /*=============================
   =       USER STORAGE        =
   =============================*/
  /**
   * Store the logged-in user's info (e.g. name, email)
   * so we can display it in the Profile component.
   */
  setUserInfo(user: { id: string; email: string; name: string }): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  /**
   * Get user info (e.g. name, email)
   */
  getUserInfo(): { id: string; email: string; name: string } | null {
    const userString = localStorage.getItem('currentUser');
    if (!userString) {
      return null;
    }
    try {
      return JSON.parse(userString);
    } catch (error) {
      console.error('Error parsing user info from localStorage:', error);
      return null;
    }
  }
}
