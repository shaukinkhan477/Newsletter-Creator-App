// reset-password.component.spec.ts

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ParamMap,
  Router,
} from '@angular/router';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  const apiUrl = 'http://localhost:3000/api/auth/reset-password';

  // Create a fake ParamMap that satisfies the interface.
  const fakeParamMap: ParamMap = {
    get: (name: string): string | null => 'fakeToken',
    has: (name: string): boolean => true,
    getAll: (name: string): string[] => ['fakeToken'],
    keys: [],
  };

  // Create a minimal dummy ActivatedRouteSnapshot that includes title and queryParamMap.
  const fakeActivatedRouteSnapshot: ActivatedRouteSnapshot = {
    paramMap: fakeParamMap,
    queryParamMap: fakeParamMap, // You could also create a separate fake query param map if needed.
    title: '',
    url: [],
    params: {},
    queryParams: {},
    fragment: '',
    data: {},
    outlet: '',
    component: null,
    routeConfig: null,
    root: {} as ActivatedRouteSnapshot,
    parent: null,
    firstChild: null,
    children: [],
    pathFromRoot: [],
    toString: () => '',
  };

  // Create an ActivatedRoute stub using the fake snapshot.
  const activatedRouteStub: Partial<ActivatedRoute> = {
    snapshot: fakeActivatedRouteSnapshot,
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ResetPasswordComponent, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges(); // triggers ngOnInit
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('ngOnInit', () => {
    it('should retrieve token from route', () => {
      expect(component.token).toBe('fakeToken');
    });
  });

  describe('onSubmit', () => {
    it('should set errorMsg if newPassword or confirmPassword is missing', () => {
      // Test when newPassword is missing.
      component.newPassword = '';
      component.confirmPassword = 'password';
      component.onSubmit();
      expect(component.errorMsg).toBe('Both fields are required.');

      // Test when confirmPassword is missing.
      component.errorMsg = '';
      component.newPassword = 'password';
      component.confirmPassword = '';
      component.onSubmit();
      expect(component.errorMsg).toBe('Both fields are required.');
    });

    it('should set errorMsg if passwords do not match', () => {
      component.newPassword = 'password1';
      component.confirmPassword = 'password2';
      component.onSubmit();
      expect(component.errorMsg).toBe('Passwords do not match.');
    });

    it('should set errorMsg if token is not available', () => {
      component.token = null;
      component.newPassword = 'password1';
      component.confirmPassword = 'password1';
      component.onSubmit();
      expect(component.errorMsg).toBe('No reset token found in URL.');
    });

    it('should send POST request and handle successful reset', fakeAsync(() => {
      // Arrange valid inputs.
      component.newPassword = 'password1';
      component.confirmPassword = 'password1';
      component.token = 'fakeToken';
      // Clear any previous messages.
      component.errorMsg = 'previous error';
      component.successMsg = 'previous success';

      // Act: submit the form.
      component.onSubmit();

      // Assert: An HTTP POST request should be made to the API.
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        resetToken: 'fakeToken',
        newPassword: 'password1',
      });

      // Simulate a successful response.
      req.flush({});
      expect(component.successMsg).toBe(
        'Password reset successful! You can now log in.'
      );
      expect(component.errorMsg).toBe('');

      // Simulate the passage of 2000ms to trigger the redirection.
      tick(2000);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    }));

    it('should set errorMsg on HTTP failure with error message', () => {
      component.newPassword = 'password1';
      component.confirmPassword = 'password1';
      component.token = 'fakeToken';

      component.onSubmit();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');

      // Simulate an error response with an error message.
      req.flush(
        { message: 'Reset failed' },
        { status: 400, statusText: 'Bad Request' }
      );
      expect(component.errorMsg).toBe('Reset failed');
    });

    it('should set errorMsg on HTTP failure without error message', () => {
      component.newPassword = 'password1';
      component.confirmPassword = 'password1';
      component.token = 'fakeToken';

      component.onSubmit();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');

      // Simulate an error response without an error message.
      req.flush({}, { status: 400, statusText: 'Bad Request' });
      expect(component.errorMsg).toBe('Error resetting password.');
    });
  });
});
