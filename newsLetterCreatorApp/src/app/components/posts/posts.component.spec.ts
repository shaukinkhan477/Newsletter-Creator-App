// posts.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { loadPosts, sendNowPost } from '../../store/posts/posts.actions';
import { Router } from '@angular/router';
import { MemoizedSelector } from '@ngrx/store';
import {
  selectAllPosts,
  selectPostsLoading,
  selectPostsError,
} from '../../store/posts/posts.selectors';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let store: MockStore;
  let router: jasmine.SpyObj<Router>;

  // Define mock selectors (optional if you need to test observable values)
  let mockSelectAllPosts: MemoizedSelector<any, any[]>;
  let mockSelectPostsLoading: MemoizedSelector<any, boolean>;
  let mockSelectPostsError: MemoizedSelector<any, string | null>;

  const initialState = {};

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PostsComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    // Optionally set default selector values
    mockSelectAllPosts = store.overrideSelector(selectAllPosts, []);
    mockSelectPostsLoading = store.overrideSelector(selectPostsLoading, false);
    mockSelectPostsError = store.overrideSelector(selectPostsError, null);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadPosts action on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadPosts());
  });

  it('should set observable properties from the store', () => {
    let posts: any[] = [];
    component.posts$.subscribe((data) => (posts = data));
    expect(posts).toEqual([]);

    let loading: boolean = false;
    component.loading$.subscribe((data) => (loading = data));
    expect(loading).toBeFalse();

    let error: string | null = null;
    component.error$.subscribe((data) => (error = data));
    expect(error).toBeNull();
  });

  it('should navigate to edit-post route when editPost is called', () => {
    const postId = '123';
    component.editPost(postId);
    expect(router.navigate).toHaveBeenCalledWith(['/edit-post', postId]);
  });

  it('should dispatch sendNowPost action when sendNow is called', () => {
    const postId = '456';
    component.sendNow(postId);
    expect(store.dispatch).toHaveBeenCalledWith(sendNowPost({ postId }));
  });
});
