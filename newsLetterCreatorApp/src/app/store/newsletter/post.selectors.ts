import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.reducer';

export const selectPostState = createFeatureSelector<PostState>('post');

export const selectCurrentPost = createSelector(
  selectPostState,
  (state) => state.currentPost
);

export const selectPostLoading = createSelector(
  selectPostState,
  (state) => state.loading
);

export const selectPostError = createSelector(
  selectPostState,
  (state) => state.error
);

export const selectDraft = createSelector(
  selectPostState,
  (state) => state.draft
);
