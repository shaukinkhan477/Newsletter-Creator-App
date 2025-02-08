import { createReducer, on } from '@ngrx/store';
import * as SubscribersActions from './subscribers.actions';

export interface SubscribersState {
  subscribers: any[];
  loading: boolean;
  error: string | null;
  successMsg: string | null;
}

const initialState: SubscribersState = {
  subscribers: [],
  loading: false,
  error: null,
  successMsg: null,
};

export const subscribersReducer = createReducer(
  initialState,

  // LOAD
  on(SubscribersActions.loadSubscribers, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMsg: null,
  })),
  on(SubscribersActions.loadSubscribersSuccess, (state, { subscribers }) => ({
    ...state,
    loading: false,
    subscribers,
  })),
  on(SubscribersActions.loadSubscribersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ADD
  on(SubscribersActions.addSubscriber, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMsg: null,
  })),
  on(SubscribersActions.addSubscriberSuccess, (state, { subscriber }) => ({
    ...state,
    loading: false,
    subscribers: [...state.subscribers, subscriber],
    successMsg: 'Subscriber added successfully!',
  })),
  on(SubscribersActions.addSubscriberFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // DELETE
  on(SubscribersActions.deleteSubscriber, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMsg: null,
  })),
  on(SubscribersActions.deleteSubscriberSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    subscribers: state.subscribers.filter((s) => s._id !== id),
    successMsg: 'Subscriber deleted successfully!',
  })),
  on(SubscribersActions.deleteSubscriberFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
