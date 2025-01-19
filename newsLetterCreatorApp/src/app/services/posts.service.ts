import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private baseUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getPostById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createPost(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  sendNow(postId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${postId}/send`, {});
  }

  updatePost(postId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${postId}`, data);
  }
}
