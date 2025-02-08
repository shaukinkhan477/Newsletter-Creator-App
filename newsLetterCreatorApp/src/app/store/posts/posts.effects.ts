import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PostsActions from './posts.actions';
import { mergeMap, map, catchError, of } from 'rxjs';
import { PostsService } from '../../services/posts.service';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      mergeMap(() =>
        this.postsService.getAllPosts().pipe(
          map((res: any) =>
            PostsActions.loadPostsSuccess({ posts: res.posts })
          ),
          catchError((err) =>
            of(PostsActions.loadPostsFailure({ error: err.message }))
          )
        )
      )
    )
  );

  sendNowPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.sendNowPost),
      mergeMap(({ postId }) =>
        this.postsService.sendNow(postId).pipe(
          map(() => PostsActions.sendNowPostSuccess({ postId })),
          catchError((err) =>
            of(PostsActions.sendNowPostFailure({ error: err.message }))
          )
        )
      )
    )
  );
}
