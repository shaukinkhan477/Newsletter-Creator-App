// post.actions.ts
import { createAction, props } from '@ngrx/store';
import { Newsletter } from '../../models/newsletter.model';

export const loadPostById = createAction(
  '[Post] Load By Id',
  props<{ postId: string }>()
);
export const loadPostByIdSuccess = createAction(
  '[Post] Load By Id Success',
  props<{ post: any }>()
);
export const loadPostByIdFailure = createAction(
  '[Post] Load By Id Failure',
  props<{ error: string }>()
);

export const createPost = createAction(
  '[Post] Create',
  props<{ postData: any; isSendNow?: boolean }>()
);
export const createPostSuccess = createAction(
  '[Post] Create Success',
  props<{ post: any; isSendNow?: boolean }>()
);
export const createPostFailure = createAction(
  '[Post] Create Failure',
  props<{ error: string }>()
);

export const updatePost = createAction(
  '[Post] Update',
  props<{ postId: string; changes: any }>()
);
export const updatePostSuccess = createAction(
  '[Post] Update Success',
  props<{ post: any }>()
);
export const updatePostFailure = createAction(
  '[Post] Update Failure',
  props<{ error: string }>()
);

export const sendNowPost = createAction(
  '[Post] Send Now',
  props<{ postId: string }>()
);
export const sendNowPostSuccess = createAction(
  '[Post] Send Now Success',
  props<{ postId: string }>()
);
export const sendNowPostFailure = createAction(
  '[Post] Send Now Failure',
  props<{ error: string }>()
);

export const schedulePost = createAction(
  '[Post] Schedule',
  props<{ postData: any }>()
);

export const updateDraftField = createAction(
  '[Post] Update Draft',
  props<{ field: string; value: any }>()
);

// partialDraft can be one or many fields
export const updateDraft = createAction(
  '[Post] Update Draft',
  props<{ partialDraft: Partial<Newsletter> }>()
);
// ... schedule success/failure, etc.
