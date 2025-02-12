import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SubscribersService } from './subscribers.service';

describe('SubscribersService', () => {
  let service: SubscribersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubscribersService],
    });

    // Inject the service and HTTP testing controller
    service = TestBed.inject(SubscribersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding HTTP requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all subscribers', () => {
    const mockSubscribers = [
      { id: '1', email: 'test1@example.com', name: 'Test User 1' },
      { id: '2', email: 'test2@example.com', name: 'Test User 2' },
    ];

    // Call the service method
    service.getAll().subscribe((subscribers) => {
      expect(subscribers).toEqual(mockSubscribers);
    });

    // Expect a single HTTP GET request to the subscribers endpoint
    const req = httpMock.expectOne('http://localhost:3000/api/subscribers');
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockSubscribers);
  });

  it('should add a new subscriber', () => {
    const newSubscriber = { email: 'new@example.com', name: 'New User' };
    const mockResponse = { id: '3', ...newSubscriber };

    // Call the service method
    service.addSubscriber(newSubscriber).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    // Expect a single HTTP POST request to the subscribers endpoint
    const req = httpMock.expectOne('http://localhost:3000/api/subscribers');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newSubscriber);

    // Respond with mock data
    req.flush(mockResponse);
  });

  it('should delete a subscriber', () => {
    const subscriberId = '1';

    // Call the service method
    service.deleteSubscriber(subscriberId).subscribe((response) => {
      expect(response).toBeNull(); // Assuming the API returns no content on delete
    });

    // Expect a single HTTP DELETE request to the subscribers endpoint
    const req = httpMock.expectOne(
      `http://localhost:3000/api/subscribers/${subscriberId}`
    );
    expect(req.request.method).toBe('DELETE');

    // Respond with no content
    req.flush(null);
  });
});
