// login.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Observable, of as observableOf } from 'rxjs';

// A simple fake TranslateLoader that returns an empty translation object.
class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return observableOf({});
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spy objects for AuthService and Router.
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'login',
      'setToken',
      'setUserInfo',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set errorMsg if email or password is missing', () => {
    // Arrange
    component.email = '';
    component.password = '';

    // Act
    component.onSubmit();

    // Assert
    expect(component.errorMsg).toBe('All fields are required.');
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should call login and handle successful login', fakeAsync(() => {
    // Arrange
    component.email = 'test@example.com';
    component.password = 'password';
    const loginResponse = {
      token: 'abc123',
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
    };
    authServiceSpy.login.and.returnValue(of(loginResponse));

    // Act
    component.onSubmit();

    // Assert
    expect(authServiceSpy.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
    expect(authServiceSpy.setToken).toHaveBeenCalledWith('abc123');
    expect(authServiceSpy.setUserInfo).toHaveBeenCalledWith({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.errorMsg).toBe('');
  }));

  it('should set errorMsg when login response does not contain token', () => {
    // Arrange
    component.email = 'test@example.com';
    component.password = 'password';
    const loginResponse = {
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
    };
    authServiceSpy.login.and.returnValue(of(loginResponse));

    // Act
    component.onSubmit();

    // Assert
    expect(component.errorMsg).toBe('Invalid login response (no token).');
  });

  it('should set errorMsg when login fails', () => {
    // Arrange
    component.email = 'test@example.com';
    component.password = 'password';
    authServiceSpy.login.and.returnValue(
      throwError(() => ({ error: { message: 'Invalid credentials' } }))
    );

    // Act
    component.onSubmit();

    // Assert
    expect(component.errorMsg).toBe('Invalid credentials');
  });

  it('should navigate to /forgot-password when navigateToForgotPassword is called', () => {
    // Act
    component.navigateToForgotPassword();

    // Assert
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/forgot-password']);
  });

  it('should navigate to /signup when navigateToSignup is called', () => {
    // Act
    component.navigateToSignup();

    // Assert
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/signup']);
  });
});
