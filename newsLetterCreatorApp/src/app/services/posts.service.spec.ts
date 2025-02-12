// posts.service.spec.ts

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/api/posts';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding.
    httpMock.verify();
  });

  it('should retrieve all posts', () => {
    const dummyPosts = [
      { id: '1', title: 'Post 1' },
      { id: '2', title: 'Post 2' },
    ];

    service.getAllPosts().subscribe((posts) => {
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('should retrieve a post by id', () => {
    const dummyPost = { id: '1', title: 'Post 1' };

    service.getPostById('1').subscribe((post) => {
      expect(post).toEqual(dummyPost);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPost);
  });

  it('should create a new post', () => {
    const postData = { title: 'New Post' };
    const createdPost = { id: '3', title: 'New Post' };

    service.createPost(postData).subscribe((post) => {
      expect(post).toEqual(createdPost);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(postData);
    req.flush(createdPost);
  });

  it('should send a post immediately', () => {
    const postId = '1';
    const responseMessage = { success: true };

    service.sendNow(postId).subscribe((response) => {
      expect(response).toEqual(responseMessage);
    });

    const req = httpMock.expectOne(`${baseUrl}/${postId}/send`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({}); // Since an empty object is sent
    req.flush(responseMessage);
  });

  it('should update a post', () => {
    const postId = '1';
    const updateData = { title: 'Updated Title' };
    const updatedPost = { id: '1', title: 'Updated Title' };

    service.updatePost(postId, updateData).subscribe((post) => {
      expect(post).toEqual(updatedPost);
    });

    const req = httpMock.expectOne(`${baseUrl}/${postId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updateData);
    req.flush(updatedPost);
  });
});
