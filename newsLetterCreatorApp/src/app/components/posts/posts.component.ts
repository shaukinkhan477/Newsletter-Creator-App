import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts: any[] = [];

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postsService.getAllPosts().subscribe({
      next: (res: any) => {
        this.posts = res.posts || [];
      },
      error: (err) => console.error(err),
    });
  }

  editPost(postId: string): void {
    // Option A: Navigate to MainContentComponent with an 'edit' mode
    // e.g. '/edit-post/:id'
    this.router.navigate(['/edit-post', postId]);
  }

  sendNow(postId: string): void {
    // Directly call the sendNow endpoint
    this.postsService.sendNow(postId).subscribe({
      next: () => {
        alert('Post sent successfully!');
        this.fetchPosts(); // refresh list
      },
      error: (err) => {
        alert(err.error?.message || 'Error sending post');
      },
    });
  }
}
