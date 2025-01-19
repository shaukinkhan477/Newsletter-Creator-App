// subscribers.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SubscribersService {
  private baseUrl = 'http://localhost:3000/api/subscribers';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }

  addSubscriber(data: { email: string; name: string }) {
    return this.http.post(this.baseUrl, data);
  }

  deleteSubscriber(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
