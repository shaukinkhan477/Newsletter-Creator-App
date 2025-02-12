// profile.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';

describe('ProfileComponent (Browser Mode)', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spy objects for AuthService and Router.
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getUserInfo',
      'logout',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ProfileComponent], // ProfileComponent is standalone.
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        // Simulate a browser environment.
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit in browser mode', () => {
    it('should set userName and userEmail if user info is available', () => {
      // Arrange: simulate valid user info (including an id).
      const userInfo = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
      };
      authServiceSpy.getUserInfo.and.returnValue(userInfo);

      // Act: trigger ngOnInit.
      fixture.detectChanges();

      // Assert.
      expect(component.userName).toEqual('John Doe');
      expect(component.userEmail).toEqual('john@example.com');
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to /login if user info is not available', () => {
      // Arrange: simulate no user info.
      authServiceSpy.getUserInfo.and.returnValue(null);

      // Act: trigger ngOnInit.
      fixture.detectChanges();

      // Assert.
      expect(component.userName).toEqual('');
      expect(component.userEmail).toEqual('');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('logout', () => {
    it('should call authService.logout and navigate to /login', () => {
      // Act: call logout method.
      component.logout();

      // Assert.
      expect(authServiceSpy.logout).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});

// Separate test suite for non-browser mode.
// We reset the testing module and re-configure it with PLATFORM_ID as 'server'.
describe('ProfileComponent (Non-Browser Mode)', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Reset the testing module before reconfiguring.
    TestBed.resetTestingModule();

    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getUserInfo',
      'logout',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        // Simulate a non-browser environment.
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should not set user info or navigate if not in a browser', () => {
    // Even if getUserInfo returns a user, the code block should not run.
    authServiceSpy.getUserInfo.and.returnValue({
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
    });
    fixture.detectChanges();

    // Assert: no user info is set and no navigation occurs.
    expect(component.userName).toEqual('');
    expect(component.userEmail).toEqual('');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
