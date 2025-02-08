// post.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, switchMap } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import * as PostActions from './post.actions';

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPostById),
      mergeMap(({ postId }) =>
        this.postsService.getPostById(postId).pipe(
          map((res: any) =>
            PostActions.loadPostByIdSuccess({ post: res.post })
          ),
          catchError((err) =>
            of(PostActions.loadPostByIdFailure({ error: err.message }))
          )
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createPost),
      mergeMap(({ postData, isSendNow }) =>
        this.postsService.createPost(postData).pipe(
          map((res: any) =>
            PostActions.createPostSuccess({ post: res.post, isSendNow })
          ),
          catchError((err) =>
            of(PostActions.createPostFailure({ error: err.message }))
          )
        )
      )
    )
  );

  createPostSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createPostSuccess),
      // if isSendNow is true => dispatch sendNow
      switchMap(({ post, isSendNow }) => {
        if (isSendNow && post?._id) {
          return of(PostActions.sendNowPost({ postId: post._id }));
        }
        return of({ type: '[Post] No SendNow needed' });
      })
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.updatePost),
      mergeMap(({ postId, changes }) =>
        this.postsService.updatePost(postId, changes).pipe(
          map((res: any) => PostActions.updatePostSuccess({ post: res.post })),
          catchError((err) =>
            of(PostActions.updatePostFailure({ error: err.message }))
          )
        )
      )
    )
  );

  sendNowPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.sendNowPost),
      mergeMap(({ postId }) =>
        this.postsService.sendNow(postId).pipe(
          map(() => PostActions.sendNowPostSuccess({ postId })),
          catchError((err) =>
            of(PostActions.sendNowPostFailure({ error: err.message }))
          )
        )
      )
    )
  );

  schedulePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.schedulePost),
      mergeMap(({ postData }) =>
        this.postsService.createPost(postData).pipe(
          map((res: any) => {
            // e.g. handle success, maybe dispatch a schedule success action
            return { type: '[Post] Schedule Post Success' };
          }),
          catchError((err) =>
            of({ type: '[Post] Schedule Post Failure', error: err.message })
          )
        )
      )
    )
  );
}
