// // store.module.ts
// import { NgModule } from '@angular/core';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../../environments/environment';

// // Import the feature reducers and effects
// import { subscribersReducer } from './subscribers/subscribers.reducer';
// import { SubscribersEffects } from './subscribers/subscribers.effects';

// // If you have other features, import their reducers/effects
// // import { newsletterReducer } from './newsletter/newsletter.reducer';
// // import { NewsletterEffects } from './newsletter/newsletter.effects';

// @NgModule({
//   imports: [
//     // Combine all top-level reducers in forRoot
//     StoreModule.forRoot({
//       subscribers: subscribersReducer,
//       // newsletter: newsletterReducer,
//       // ...
//     }),

//     // Register all feature effects in EffectsModule.forRoot
//     EffectsModule.forRoot([
//       SubscribersEffects,
//       // NewsletterEffects,
//       // ...
//     ]),

//     // Optional: Devtools for easier debugging in non-production
//     !environment.production
//       ? StoreDevtoolsModule.instrument({ maxAge: 25 })
//       : [],
//   ],
// })
// export class RootStoreModule {}
