import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';

    // Create a BehaviorSubject to track login status. Initialize based on whether a token is present.
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
  
  // Expose the login status as an observable so components can subscribe to changes.
  public loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
   * Helper to determine if there is a stored auth token.
   */
  private hasToken(): boolean {
     if (!isPlatformBrowser(this.platformId)) {
      // In non-browser environments, return false
      return false;
    }
    return !!localStorage.getItem('authToken');
  }

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
   =      OAUTH (Google)       =
   =============================*/
  loginWithGoogle(): void {
    // Redirect to backend OAuth endpoint for Google login.
    window.location.href = `${this.baseUrl}/google`;
  }

  /*=============================
   =        TOKEN STORAGE      =
   =============================*/
  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
      this.loggedInSubject.next(true);
    }
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    // return !!this.getToken();
    return this.hasToken();
  }

  logout(): void {
      if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser'); // remove user info as well
      this.loggedInSubject.next(false);
    }
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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  /**
   * Get user info (e.g. name, email)
   */
  getUserInfo(): { id: string; email: string; name: string } | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
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
