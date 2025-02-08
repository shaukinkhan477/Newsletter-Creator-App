import { createReducer, on } from '@ngrx/store';
import * as PostActions from './post.actions';
import { Newsletter } from '../../models/newsletter.model';

export interface PostState {
  currentPost: any | null;
  draft: Partial<Newsletter>;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  currentPost: null,
  draft: {
    // optionally start with empty strings:
    title: '',
    subject: '',
    preheader: '',
    content: '',
    schedule: null,
    segmentId: '',
  },
  loading: false,
  error: null,
};

export const postReducer = createReducer(
  initialState,

  // ------------------------------
  // Load Post
  // ------------------------------
  on(PostActions.loadPostById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PostActions.loadPostByIdSuccess, (state, { post }) => ({
    ...state,
    loading: false,
    currentPost: post,
  })),
  on(PostActions.loadPostByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ------------------------------
  // Create Post
  // ------------------------------
  on(PostActions.createPost, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PostActions.createPostSuccess, (state, { post }) => ({
    ...state,
    loading: false,
    currentPost: post,
  })),
  on(PostActions.createPostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ------------------------------
  // Update Post
  // ------------------------------
  on(PostActions.updatePost, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PostActions.updatePostSuccess, (state, { post }) => ({
    ...state,
    loading: false,
    currentPost: post,
  })),
  on(PostActions.updatePostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ------------------------------
  // Send Now
  // ------------------------------
  on(PostActions.sendNowPost, (state) => ({
    ...state,
    loading: true,
  })),
  on(PostActions.sendNowPostSuccess, (state, { postId }) => ({
    ...state,
    loading: false,
  })),
  on(PostActions.sendNowPostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ------------------------------
  // Draft Handling
  // ------------------------------
  on(PostActions.updateDraftField, (state, { field, value }) => ({
    ...state,
    // spread the existing draft
    draft: {
      ...state.draft,
      // update just one field
      [field]: value,
    },
  })),

  // Update the draft with partial data
  on(PostActions.updateDraft, (state, { partialDraft }) => ({
    ...state,
    // Merge partial updates into the existing draft
    draft: {
      ...state.draft,
      ...partialDraft,
    },
  }))
);
