import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectAllPosts = createSelector(
  selectPostsState,
  (state) => state.posts
);

export const selectPostsLoading = createSelector(
  selectPostsState,
  (state) => state.loading
);

export const selectPostsError = createSelector(
  selectPostsState,
  (state) => state.error
);
