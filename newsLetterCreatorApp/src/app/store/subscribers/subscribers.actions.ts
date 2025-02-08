import { createAction, props } from '@ngrx/store';

export const loadSubscribers = createAction('[Subscribers] Load');
export const loadSubscribersSuccess = createAction(
  '[Subscribers] Load Success',
  props<{ subscribers: any[] }>()
);
export const loadSubscribersFailure = createAction(
  '[Subscribers] Load Failure',
  props<{ error: string }>()
);

export const addSubscriber = createAction(
  '[Subscribers] Add Subscriber',
  props<{ email: string; name: string }>()
);
export const addSubscriberSuccess = createAction(
  '[Subscribers] Add Subscriber Success',
  props<{ subscriber: any }>()
);
export const addSubscriberFailure = createAction(
  '[Subscribers] Add Subscriber Failure',
  props<{ error: string }>()
);

export const deleteSubscriber = createAction(
  '[Subscribers] Delete Subscriber',
  props<{ id: string }>()
);
export const deleteSubscriberSuccess = createAction(
  '[Subscribers] Delete Subscriber Success',
  props<{ id: string }>()
);
export const deleteSubscriberFailure = createAction(
  '[Subscribers] Delete Subscriber Failure',
  props<{ error: string }>()
);
