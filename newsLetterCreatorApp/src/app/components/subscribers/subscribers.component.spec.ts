// subscribers.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscribersComponent } from './subscribers.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import {
  loadSubscribers,
  addSubscriber,
  deleteSubscriber,
} from '../../store/subscribers/subscribers.actions';

describe('SubscribersComponent', () => {
  let component: SubscribersComponent;
  let fixture: ComponentFixture<SubscribersComponent>;
  let store: MockStore;
  const initialState = {}; // You can set up initial state for selectors if needed

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Since SubscribersComponent is standalone, we can import it directly
      imports: [SubscribersComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    // Inject the mock store and spy on its dispatch method
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(SubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch loadSubscribers action on init', () => {
    // When the component initializes, it dispatches the loadSubscribers action.
    expect(store.dispatch).toHaveBeenCalledWith(loadSubscribers());
  });

  it('should set observables from the store on init', () => {
    expect(component.subscribers$).toBeDefined();
    expect(component.loading$).toBeDefined();
    expect(component.errorMsg$).toBeDefined();
    expect(component.successMsg$).toBeDefined();
  });

  it('should dispatch addSubscriber action and reset fields when adding a new subscriber with an email', () => {
    // Reset any previous dispatch calls (e.g., from ngOnInit)
    (store.dispatch as jasmine.Spy).calls.reset();

    component.newEmail = 'test@example.com';
    component.newName = 'Test User';

    component.addNewSubscriber();

    expect(store.dispatch).toHaveBeenCalledWith(
      addSubscriber({ email: 'test@example.com', name: 'Test User' })
    );
    // After dispatch, the local fields should be reset
    expect(component.newEmail).toBe('');
    expect(component.newName).toBe('');
  });

  it('should alert and not dispatch addSubscriber action if email is not provided', () => {
    (store.dispatch as jasmine.Spy).calls.reset();
    spyOn(window, 'alert');

    component.newEmail = ''; // No email provided
    component.newName = 'Test User';

    component.addNewSubscriber();

    expect(window.alert).toHaveBeenCalledWith('Email is required');
    // Verify that addSubscriber action was not dispatched.
    expect(store.dispatch).not.toHaveBeenCalledWith(
      jasmine.objectContaining({ type: addSubscriber.type })
    );
  });

  it('should dispatch deleteSubscriber action when removal is confirmed', () => {
    (store.dispatch as jasmine.Spy).calls.reset();
    spyOn(window, 'confirm').and.returnValue(true);

    component.removeSubscriber('123');

    expect(store.dispatch).toHaveBeenCalledWith(
      deleteSubscriber({ id: '123' })
    );
  });

  it('should not dispatch deleteSubscriber action when removal is canceled', () => {
    (store.dispatch as jasmine.Spy).calls.reset();
    spyOn(window, 'confirm').and.returnValue(false);

    component.removeSubscriber('123');

    // Ensure deleteSubscriber action was not dispatched when user cancels
    expect(store.dispatch).not.toHaveBeenCalledWith(
      deleteSubscriber({ id: '123' })
    );
  });
});
