import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// Import your actions and selectors
import { loadPosts, sendNowPost } from '../../store/posts/posts.actions';
import {
  selectAllPosts,
  selectPostsLoading,
  selectPostsError,
} from '../../store/posts/posts.selectors';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'], // Ensure you use "styleUrls" (plural)
})
export class PostsComponent implements OnInit {
  // Observables from store
  posts$!: Observable<any[]>; // or a Post[] interface
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    // Dispatch action to load posts
    this.store.dispatch(loadPosts());

    // Select state from store
    this.posts$ = this.store.select(selectAllPosts);
    this.loading$ = this.store.select(selectPostsLoading);
    this.error$ = this.store.select(selectPostsError);
  }

  editPost(postId: string): void {
    this.router.navigate(['/edit-post', postId]);
  }

  sendNow(postId: string): void {
    // Dispatch the "sendNowPost" action
    this.store.dispatch(sendNowPost({ postId }));
  }
}
