import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SubscribersState } from './subscribers.reducer';

export const selectSubscribersState =
  createFeatureSelector<SubscribersState>('subscribers');

export const selectAllSubscribers = createSelector(
  selectSubscribersState,
  (state) => state.subscribers
);

export const selectSubscriberLoading = createSelector(
  selectSubscribersState,
  (state) => state.loading
);

export const selectSubscriberError = createSelector(
  selectSubscribersState,
  (state) => state.error
);

export const selectSubscriberSuccess = createSelector(
  selectSubscribersState,
  (state) => state.successMsg
);
