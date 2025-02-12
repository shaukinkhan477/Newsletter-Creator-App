// signup.component.spec.ts

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError, Observable } from 'rxjs';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// Create a fake loader that returns an empty object for any language.
class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'signup',
      'setToken',
      'setUserInfo',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        SignupComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set errorMsg if any field is missing', () => {
    // Arrange: clear all fields.
    component.name = '';
    component.email = '';
    component.password = '';

    // Act:
    component.onSubmit();

    // Assert:
    expect(component.errorMsg).toBe('All fields are required.');
    expect(authServiceSpy.signup).not.toHaveBeenCalled();
  });

  it('should call signup and handle a successful signup', fakeAsync(() => {
    // Arrange: provide valid fields.
    component.name = 'John Doe';
    component.email = 'john@example.com';
    component.password = 'password123';

    const signupResponse = {
      token: 'abc123',
      user: { id: '123', email: 'john@example.com', name: 'John Doe' },
    };
    authServiceSpy.signup.and.returnValue(of(signupResponse));

    // Act:
    component.onSubmit();

    // Immediately, success message should be set and error cleared.
    expect(component.successMsg).toBe(
      'Successfully signed up! Redirecting to login...'
    );
    expect(component.errorMsg).toBe('');

    // Simulate the passage of 3 seconds.
    tick(3000);

    // Assert: router.navigate should have been called with ['/login'].
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    // Also verify that token and user info were set.
    expect(authServiceSpy.setToken).toHaveBeenCalledWith('abc123');
    expect(authServiceSpy.setUserInfo).toHaveBeenCalledWith({
      id: '123',
      email: 'john@example.com',
      name: 'John Doe',
    });
  }));

  it('should set errorMsg on signup failure', () => {
    // Arrange: provide valid fields.
    component.name = 'John Doe';
    component.email = 'john@example.com';
    component.password = 'password123';

    // Simulate an error response.
    authServiceSpy.signup.and.returnValue(
      throwError(() => ({ error: { message: 'Signup failed.' } }))
    );

    // Act:
    component.onSubmit();

    // Assert:
    expect(component.errorMsg).toBe('Signup failed.');
  });

  it('should navigate to /login when navigateToLogin is called', () => {
    // Act:
    component.navigateToLogin();

    // Assert:
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
