import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/** Example Subscriber interface/model */
export interface Subscriber {
  id: number;
  email: string;
  name?: string;
  status: 'active' | 'inactive' | 'need-approval' | 'pending';
}

@Injectable({
  providedIn: 'root', // ensures the service is available app-wide
})
export class SubscribersService {
  // Placeholder for our mock data
  private subscribersData: Subscriber[] = [
    { id: 1, email: 'john@example.com', name: 'John Doe', status: 'active' },
    {
      id: 2,
      email: 'jane@example.com',
      name: 'Jane Smith',
      status: 'inactive',
    },
    {
      id: 3,
      email: 'peter@example.com',
      name: 'Peter Parker',
      status: 'need-approval',
    },
    { id: 4, email: 'lisa@example.com', name: 'Lisa Jones', status: 'pending' },
  ];

  constructor() {}

  /** Simulated GET /api/subscribers */
  getAllSubscribers(): Observable<Subscriber[]> {
    return of(this.subscribersData);
  }

  /** Simulated GET /api/subscribers/:id */
  getSubscriberById(id: number): Observable<Subscriber | undefined> {
    const found = this.subscribersData.find((sub) => sub.id === id);
    return of(found);
  }

  /** Simulated POST /api/subscribers */
  addSubscriber(sub: Subscriber): Observable<Subscriber> {
    // In a real API call, you'd call HttpClient.post(...)
    sub.id = Date.now(); // just a mock ID
    this.subscribersData.push(sub);
    return of(sub);
  }

  /** Simulated PUT /api/subscribers/:id */
  updateSubscriber(
    id: number,
    updates: Partial<Subscriber>
  ): Observable<Subscriber | undefined> {
    const index = this.subscribersData.findIndex((sub) => sub.id === id);
    if (index !== -1) {
      this.subscribersData[index] = {
        ...this.subscribersData[index],
        ...updates,
      };
      return of(this.subscribersData[index]);
    }
    return of(undefined);
  }

  /** Simulated DELETE /api/subscribers/:id */
  deleteSubscriber(id: number): Observable<boolean> {
    const initialLength = this.subscribersData.length;
    this.subscribersData = this.subscribersData.filter((sub) => sub.id !== id);
    return of(this.subscribersData.length < initialLength);
  }
}
