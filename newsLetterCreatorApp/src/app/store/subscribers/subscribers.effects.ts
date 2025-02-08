import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SubsActions from './subscribers.actions';
import { SubscribersService } from '../../services/subscribers.service';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class SubscribersEffects {
  constructor(
    private actions$: Actions,
    private subscribersService: SubscribersService
  ) {}

  loadSubscribers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubsActions.loadSubscribers),
      mergeMap(() =>
        this.subscribersService.getAll().pipe(
          map((res: any) =>
            SubsActions.loadSubscribersSuccess({ subscribers: res.subscribers })
          ),
          catchError((err) =>
            of(SubsActions.loadSubscribersFailure({ error: err.message }))
          )
        )
      )
    )
  );

  addSubscriber$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubsActions.addSubscriber),
      mergeMap(({ email, name }) =>
        this.subscribersService.addSubscriber({ email, name }).pipe(
          map((response: any) =>
            SubsActions.addSubscriberSuccess({
              subscriber: response.subscriber,
            })
          ),
          catchError((err) =>
            of(SubsActions.addSubscriberFailure({ error: err.message }))
          )
        )
      )
    )
  );

  deleteSubscriber$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubsActions.deleteSubscriber),
      mergeMap(({ id }) =>
        this.subscribersService.deleteSubscriber(id).pipe(
          map(() => SubsActions.deleteSubscriberSuccess({ id })),
          catchError((err) =>
            of(SubsActions.deleteSubscriberFailure({ error: err.message }))
          )
        )
      )
    )
  );
}
