import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface EmailStats {
  period: string;
  sentCount: number;
  clickedCount: number;
}

export interface CustomerStats {
  customerEmail: string;
  sentCount: number;
  clickedCount: number;
}

@Injectable({
  providedIn: 'root', // Standalone service can also be declared in 'root'
})
export class AnalyticsService {
  constructor() {}

  /**
   * Example: Get total email analytics by day, week, month, etc.
   * In a real app, you'd fetch this from an API endpoint.
   */
  getEmailStatsByPeriod(
    period: 'daily' | 'weekly' | 'monthly'
  ): Observable<EmailStats[]> {
    // Mock data for demonstration
    const dummyData: { [key: string]: EmailStats[] } = {
      daily: [
        { period: 'Mon', sentCount: 120, clickedCount: 65 },
        { period: 'Tue', sentCount: 150, clickedCount: 70 },
        { period: 'Wed', sentCount: 90, clickedCount: 45 },
        { period: 'Thu', sentCount: 200, clickedCount: 110 },
        { period: 'Fri', sentCount: 180, clickedCount: 100 },
        { period: 'Sat', sentCount: 75, clickedCount: 30 },
        { period: 'Sun', sentCount: 95, clickedCount: 50 },
      ],
      weekly: [
        { period: 'Week 1', sentCount: 720, clickedCount: 340 },
        { period: 'Week 2', sentCount: 850, clickedCount: 460 },
        { period: 'Week 3', sentCount: 690, clickedCount: 320 },
        { period: 'Week 4', sentCount: 940, clickedCount: 500 },
      ],
      monthly: [
        { period: 'Jan', sentCount: 3200, clickedCount: 1400 },
        { period: 'Feb', sentCount: 3800, clickedCount: 1850 },
        { period: 'Mar', sentCount: 4200, clickedCount: 2100 },
        { period: 'Apr', sentCount: 5000, clickedCount: 2900 },
      ],
    };

    return of(dummyData[period]);
  }

  /**
   * Example: Get email stats per customer
   */
  getCustomerStats(): Observable<CustomerStats[]> {
    // Mock data
    const dummyCustomerStats: CustomerStats[] = [
      { customerEmail: 'john@example.com', sentCount: 25, clickedCount: 10 },
      { customerEmail: 'jane@example.com', sentCount: 40, clickedCount: 15 },
      { customerEmail: 'peter@example.com', sentCount: 12, clickedCount: 5 },
      { customerEmail: 'lisa@example.com', sentCount: 33, clickedCount: 17 },
    ];
    return of(dummyCustomerStats);
  }

  /**
   * Example: Integrate external trackers (Google, Meta).
   * In real usage, you might inject Google Analytics or FB Pixel tracking here,
   * or call an endpoint that logs events.
   */
  trackEventWithThirdParty(tracker: 'google' | 'meta', eventName: string) {
    // Stub: implement real logic to push data to GA or Meta pixel
    console.log(`[${tracker.toUpperCase()} TRACK] Event: ${eventName}`);
  }
}
