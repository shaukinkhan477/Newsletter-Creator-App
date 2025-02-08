// app.state.ts
import { SubscribersState } from './subscribers/subscribers.reducer';
// import other feature states (NewsletterState, AuthState) as you create them

export interface AppState {
  subscribers: SubscribersState;
  // newsletter: NewsletterState;
  // auth: AuthState;
}
