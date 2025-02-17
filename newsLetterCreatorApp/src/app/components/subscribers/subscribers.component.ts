import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import {
  loadSubscribers,
  addSubscriber,
  deleteSubscriber,
} from '../../store/subscribers/subscribers.actions';
import {
  selectAllSubscribers,
  selectSubscriberLoading,
  selectSubscriberError,
  selectSubscriberSuccess,
} from '../../store/subscribers/subscribers.selectors';

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSkeletonLoaderModule],
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
})
export class SubscribersComponent implements OnInit {
  // Local form fields
  newEmail = '';
  newName = '';

  // Observables from the store
  subscribers$!: Observable<any[]>;
  loading$!: Observable<boolean>;
  errorMsg$!: Observable<string | null>;
  successMsg$!: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Dispatch an action to load all subscribers
    this.store.dispatch(loadSubscribers());

    // Select data from the store
    this.subscribers$ = this.store.select(selectAllSubscribers);
    this.loading$ = this.store.select(selectSubscriberLoading);
    this.errorMsg$ = this.store.select(selectSubscriberError);
    this.successMsg$ = this.store.select(selectSubscriberSuccess);
  }

  addNewSubscriber(): void {
    if (!this.newEmail) {
      alert('Email is required');
      return;
    }

    // Dispatch the addSubscriber action
    this.store.dispatch(
      addSubscriber({
        email: this.newEmail,
        name: this.newName,
      })
    );

    // Reset the local form fields
    this.newEmail = '';
    this.newName = '';
  }

  removeSubscriber(id: string): void {
    if (!confirm('Are you sure you want to delete this subscriber?')) {
      return;
    }

    // Dispatch the deleteSubscriber action
    this.store.dispatch(deleteSubscriber({ id }));
  }
}
