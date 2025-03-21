import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleModalComponent } from '../schedule-modal/schedule-modal.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { updateDraft } from '../../store/newsletter/post.actions';
import { selectDraft } from '../../store/newsletter/post.selectors';
import { Newsletter } from '../../models/newsletter.model';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AngularDraggableModule } from 'angular2-draggable';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare var unlayer: any;

@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ScheduleModalComponent,
    TranslateModule,
    NgxSkeletonLoaderModule,
    AngularDraggableModule,
  ],
  templateUrl: './drag-and-drop.component.html',
  styleUrl: './drag-and-drop.component.css',
})
export class DragAndDropComponent implements OnInit, AfterViewChecked {
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
  showScheduleModal = false;
  loading = true;
  safeContent: SafeHtml | null = null;
  postId: string | null = null;

  // Optionally, subscribe to a store slice if needed
  draft$ = this.store.select(selectDraft);

  @ViewChild('editorContainer', { static: false }) editorContainer!: ElementRef;

  private editorInitialized = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private translate: TranslateService,
    private sanitizer: DomSanitizer,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Show a skeleton loader for 1s before displaying the editor
    setTimeout(() => {
      this.loading = false;
    }, 1000);

    // Pre-fill newsletter fields if coming from query params
    this.route.queryParams.subscribe((params) => {
      if (params['subject']) {
        this.newsletter.title = params['title'];
        this.newsletter.image = params['image'];
        this.newsletter.subject = params['subject'];
        this.newsletter.preheader = params['preheader'];
        this.newsletter.content = params['content'];
      }
    });

    // Check if editing an existing post
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.editMode = true;
      this.loadPost(this.postId);
    }
  }

  ngAfterViewChecked(): void {
    if (!this.loading && !this.editorInitialized && this.editorContainer) {
      this.editorInitialized = true;
      if (window.hasOwnProperty('unlayer')) {
        unlayer.init({
          id: this.editorContainer.nativeElement.id,
          displayMode: 'email',
        });
        // If there is pre-existing content (design JSON), load it into Unlayer.
        if (this.newsletter.content) {
          try {
            const design = JSON.parse(this.newsletter.content);
            unlayer.loadDesign(design);
          } catch (err) {
            console.warn(
              'Content is not in design JSON format. Ignoring loadDesign.'
            );
          }
        }
      } else {
        console.error(
          'Unlayer script not loaded. Please include it in your index.html.'
        );
      }
    }
  }

  onFieldChange(field: keyof Newsletter, value: string): void {
    this.newsletter[field] = value;
    if (field === 'content') {
      // Bypass security for content preview if needed
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(value);
    }
    this.store.dispatch(updateDraft({ partialDraft: { [field]: value } }));
  }

  loadPost(id: string): void {
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
        // If content is available and valid design JSON, load it into Unlayer
        if (this.editorContainer && this.newsletter.content) {
          try {
            const design = JSON.parse(this.newsletter.content);
            unlayer.loadDesign(design);
          } catch (err) {
            console.warn('Content is not in design JSON format.');
          }
        }
      },
      error: () => {
        alert('Error loading post');
        this.router.navigate(['/posts']);
      },
    });
  }

  // Validate required fields
  fieldsAreValid(): boolean {
    const { title, subject, preheader, content } = this.newsletter;
    if (!title || !subject || !preheader || !content) {
      this.errorMsg = 'Please fill out all required fields.';
      return false;
    }
    this.errorMsg = '';
    return true;
  }

  // Wrap unlayer.exportHtml in a promise so you can await it
  exportContentPromise(): Promise<string> {
    return new Promise((resolve, reject) => {
      unlayer.exportHtml((data: any) => {
        resolve(data.html);
      });
    });
  }

  // Save a new post as draft
  async saveAsDraft(): Promise<void> {
    const html = await this.exportContentPromise();
    this.newsletter.content = html;

    if (!this.fieldsAreValid()) {
      return;
    }

    const postData = { ...this.newsletter, status: 'draft' };
    this.postsService.createPost(postData).subscribe({
      next: () => {
        alert('Saved as draft!');
      },
      error: (err) => {
        alert(err.error?.message || 'Error saving draft');
      },
    });
  }

  // Save changes when editing an existing post
  async saveChanges(): Promise<void> {
    if (!this.postId) return;
    const html = await this.exportContentPromise();
    this.newsletter.content = html;
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

  // Open the scheduling modal
  async openScheduleModal(): Promise<void> {
    const html = await this.exportContentPromise();
    this.newsletter.content = html;

    if (!this.fieldsAreValid()) {
      return;
    }
    this.showScheduleModal = true;
  }

  // Schedule the post
  async schedulePost(dateTime: Date): Promise<void> {
    const html = await this.exportContentPromise();
    this.newsletter.content = html;
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

  // Send the post immediately
  async sendNow(): Promise<void> {
    const html = await this.exportContentPromise();
    this.newsletter.content = html;

    if (!this.fieldsAreValid()) {
      return;
    }

    const postData = { ...this.newsletter, status: 'draft' };
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
