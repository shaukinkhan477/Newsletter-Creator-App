// auth.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/api/auth';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    // Ensure localStorage is clean before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  describe('HTTP operations', () => {
    it('should call signup API with POST method and return response', () => {
      const signupData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      const dummyResponse = { success: true };

      service.signup(signupData).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/signup`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(signupData);
      req.flush(dummyResponse);
    });

    it('should call login API with POST method and return response', () => {
      const loginData = { email: 'john@example.com', password: 'password123' };
      const dummyResponse = { token: 'abc123' };

      service.login(loginData).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(loginData);
      req.flush(dummyResponse);
    });
  });

  describe('LocalStorage operations', () => {
    it('should store and retrieve token correctly', () => {
      service.setToken('abc123');
      expect(localStorage.getItem('authToken')).toBe('abc123');
      expect(service.getToken()).toBe('abc123');
    });

    it('should return correct login status based on token presence', () => {
      // No token means not logged in
      expect(service.isLoggedIn()).toBeFalse();
      service.setToken('abc123');
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('should remove token and user info on logout', () => {
      localStorage.setItem('authToken', 'abc123');
      localStorage.setItem(
        'currentUser',
        JSON.stringify({ id: '1', email: 'john@example.com', name: 'John Doe' })
      );

      service.logout();

      expect(localStorage.getItem('authToken')).toBeNull();
      expect(localStorage.getItem('currentUser')).toBeNull();
    });

    it('should store and retrieve user info correctly', () => {
      const userInfo = { id: '1', email: 'john@example.com', name: 'John Doe' };
      service.setUserInfo(userInfo);

      const storedUser = localStorage.getItem('currentUser');
      expect(storedUser).not.toBeNull();
      expect(JSON.parse(storedUser!)).toEqual(userInfo);

      const retrievedUser = service.getUserInfo();
      expect(retrievedUser).toEqual(userInfo);
    });

    it('should return null for getUserInfo if no user info is stored', () => {
      expect(service.getUserInfo()).toBeNull();
    });

    it('should return null and log error when stored user info is invalid JSON', () => {
      localStorage.setItem('currentUser', 'not a valid json');
      spyOn(console, 'error'); // spy on console.error to avoid actual error logging in test

      const userInfo = service.getUserInfo();
      expect(userInfo).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });
  });
});
