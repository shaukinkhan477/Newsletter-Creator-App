import { createReducer, on } from '@ngrx/store';
import * as PostsActions from './posts.actions';

export interface PostsState {
  posts: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const postsReducer = createReducer(
  initialState,
  on(PostsActions.loadPosts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PostsActions.loadPostsSuccess, (state, { posts }) => ({
    ...state,
    loading: false,
    posts,
  })),
  on(PostsActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // sendNow
  on(PostsActions.sendNowPost, (state) => ({
    ...state,
    loading: true,
  })),
  on(PostsActions.sendNowPostSuccess, (state, { postId }) => {
    // Option: we can find the post in `state.posts` and mark it as 'sent'
    const updated = state.posts.map((p) =>
      p._id === postId ? { ...p, status: 'sent', sentAt: new Date() } : p
    );
    return {
      ...state,
      loading: false,
      posts: updated,
    };
  }),
  on(PostsActions.sendNowPostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
