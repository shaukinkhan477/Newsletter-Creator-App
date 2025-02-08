import { createAction, props } from '@ngrx/store';

export const loadPosts = createAction('[Posts] Load');
export const loadPostsSuccess = createAction(
  '[Posts] Load Success',
  props<{ posts: any[] }>()
);
export const loadPostsFailure = createAction(
  '[Posts] Load Failure',
  props<{ error: string }>()
);

export const sendNowPost = createAction(
  '[Posts] Send Now Post',
  props<{ postId: string }>()
);
export const sendNowPostSuccess = createAction(
  '[Posts] Send Now Post Success',
  props<{ postId: string }>()
);
export const sendNowPostFailure = createAction(
  '[Posts] Send Now Post Failure',
  props<{ error: string }>()
);
