import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleModalComponent } from '../schedule-modal/schedule-modal.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
// import { selectDraft } from '../../store/newsletter/post.selectors';
import {
  updateDraftField,
  updateDraft,
} from '../../store/newsletter/post.actions';
import { selectDraft } from '../../store/newsletter/post.selectors';
import { Newsletter } from '../../models/newsletter.model';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EditorModule,
    ScheduleModalComponent,
    TranslateModule,
  ],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {
  newsletter: Partial<Newsletter> = {
    title: '',
    subject: '',
    preheader: '',
    content: '',
    schedule: null,
    segmentId: '',
  };

  editMode = false;
  errorMsg = '';
  editorConfig: any; // TinyMCE config
  showScheduleModal = false;
  sharedDataService: any;
  postId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private translate: TranslateService,
    private store: Store
  ) {
    // Editor config initialization
    this.editorConfig = {
      height: 500,
      menubar: false,
      plugins: [
        'advlist',
        'autolink',
        'lists',
        'link',
        'image',
        'charmap',
        'preview',
        'anchor',
        'searchreplace',
        'visualblocks',
        'code',
        'fullscreen',
        'insertdatetime',
        'media',
        'table',
        'code',
        'help',
        'wordcount',
        'colorpicker',
      ],
      toolbar:
        'undo redo | blocks | preview bold italic forecolor backcolor | ' +
        'alignleft aligncenter alignright | ' +
        'bullist numlist outdent indent code | link image',
    };
  }


  // We'll subscribe to the store's draft
  draft$ = this.store.select(selectDraft);

  ngOnInit() {
    // Refill local 'newsletter' whenever the store's draft changes
    this.draft$.subscribe((draft) => {
      // Merge existing fields so we don't overwrite local changes?
      // Or just replace it entirely:
      this.newsletter = { ...draft };
    });
    // Check if there's an :id in the route
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      // We are editing an existing post
      this.editMode = true;
      this.loadPost(this.postId);
    }
  }

  onFieldChange(field: keyof Newsletter, value: string) {
    // 1) Update local state
    this.newsletter[field] = value;
    // 2) Dispatch partial update
    this.store.dispatch(updateDraft({ partialDraft: { [field]: value } }));
  }

  loadPost(id: string) {
    this.postsService.getPostById(id).subscribe({
      next: (res: any) => {
        const post = res.post;
        this.newsletter = {
          title: post.title,
          subject: post.subject,
          preheader: post.preheader,
          content: post.content,
          schedule: post.schedule || null,
        };
      },
      error: () => {
        alert('Error loading post');
        this.router.navigate(['/posts']); // or some fallback
      },
    });
  }

  /* ------------------------------
     EDITING an Existing Post
  --------------------------------*/

  saveChanges() {
    if (!this.postId) return;
    const updatedData = { ...this.newsletter };
    this.postsService.updatePost(this.postId, updatedData).subscribe({
      next: () => {
        alert('Post updated successfully');
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        alert(err.error?.message || 'Error updating post');
      },
    });
  }

  private fieldsAreValid(): boolean {
    const { title, subject, preheader, content } = this.newsletter;
    if (!title || !subject || !preheader || !content) {
      this.errorMsg = 'Please fill out all required fields.';
      return false;
    }
    this.errorMsg = '';
    return true;
  }

  /* ------------------------------
     Creating a NEW Post
  --------------------------------*/

  saveAsDraft(): void {
    if (!this.fieldsAreValid()) {
      return; // Show error message instead
    }
    const postData = {
      ...this.newsletter,
      status: 'draft',
    };
    // Call your service to save as draft
    this.postsService.createPost(postData).subscribe({
      next: () => {
        alert('Saved as draft!');
        // Optional: clear fields or navigate away
      },
      error: (err) => {
        alert(err.error?.message || 'Error saving draft');
      },
    });
  }

  /* ------------------------------
     Schedule a Post
  --------------------------------*/

  openScheduleModal(): void {
    if (!this.fieldsAreValid()) {
      return;
    }
    this.showScheduleModal = true;
  }

  schedulePost(dateTime: Date): void {
    const postData = {
      ...this.newsletter,
      status: 'scheduled',
      scheduledAt: dateTime,
    };
    this.postsService.createPost(postData).subscribe({
      next: () => {
        alert(`Post scheduled for ${dateTime}`);
      },
      error: (err) => {
        alert(err.error?.message || 'Error scheduling post');
      },
    });
    this.showScheduleModal = false;
  }

  closeModal(): void {
    this.showScheduleModal = false;
  }

  sendNow(): void {
    if (!this.fieldsAreValid()) {
      return;
    }
    // Create the post, then call "send now"
    const postData = {
      ...this.newsletter,
      status: 'draft',
    };
    this.postsService.createPost(postData).subscribe({
      next: (res: any) => {
        const postId = res.post?._id;
        if (!postId) {
          alert('No post ID returned. Cannot send now.');
          return;
        }
        this.postsService.sendNow(postId).subscribe({
          next: () => {
            alert('Newsletter sent!');
          },
          error: (err) => {
            alert(err.error?.message || 'Error sending newsletter');
          },
        });
      },
      error: (err) => {
        alert(err.error?.message || 'Error creating post');
      },
    });
  }
}
