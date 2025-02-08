import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Import TranslateModule and TranslateLoader
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { subscribersReducer } from './store/subscribers/subscribers.reducer';
import { SubscribersEffects } from './store/subscribers/subscribers.effects';
import { postsReducer } from './store/posts/posts.reducer';
import { PostsEffects } from './store/posts/posts.effects';
import { postReducer } from './store/newsletter/post.reducer';
import { PostEffects } from './store/newsletter/post.effects';

// AoT requires an exported function for the TranslateLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideCharts(withDefaultRegisterables()),
    provideStore({
      post: postReducer,
      subscribers: subscribersReducer,
      posts: postsReducer,
    }),
    provideEffects([SubscribersEffects, PostsEffects, PostEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),

    // Add TranslateModule configuration
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en', // Set the default language
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
};
