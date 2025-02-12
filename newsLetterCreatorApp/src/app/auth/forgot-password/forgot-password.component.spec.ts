// forgot-password.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api/auth/forgot-password';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding.
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set errorMsg if email is empty', () => {
    // Arrange
    component.email = '';

    // Act
    component.onSubmit();

    // Assert
    expect(component.errorMsg).toBe('Email is required.');
  });

  it('should send POST request and set successMsg on success', () => {
    // Arrange
    component.email = 'test@example.com';

    // Act
    component.onSubmit();

    // Assert: Expect a POST request to be made.
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@example.com' });

    // Simulate a successful response.
    req.flush({});

    expect(component.successMsg).toBe(
      'If that email exists, a reset link has been sent!'
    );
    expect(component.errorMsg).toBe('');
  });

  it('should set errorMsg on HTTP request failure with server error message', () => {
    // Arrange
    component.email = 'test@example.com';

    // Act
    component.onSubmit();

    // Assert: Expect a POST request.
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');

    // Simulate an error response with a message.
    req.flush(
      { message: 'Server error' },
      { status: 400, statusText: 'Bad Request' }
    );

    expect(component.errorMsg).toBe('Server error');
  });

  it('should set errorMsg on HTTP request failure without error message', () => {
    // Arrange
    component.email = 'test@example.com';

    // Act
    component.onSubmit();

    // Assert: Expect a POST request.
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');

    // Simulate an error response without a message.
    req.flush({}, { status: 400, statusText: 'Bad Request' });

    expect(component.errorMsg).toBe('Error sending reset email.');
  });
});
