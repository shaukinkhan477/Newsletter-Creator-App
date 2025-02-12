// main-content.component.spec.ts

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MainContentComponent } from './main-content.component';
import { PostsService } from '../../services/posts.service';
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ParamMap,
} from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { updateDraft } from '../../store/newsletter/post.actions';
import { selectDraft } from '../../store/newsletter/post.selectors';

// A fake loader for TranslateModule
class FakeLoader implements TranslateLoader {
  getTranslation(lang: string) {
    return of({});
  }
}

// Dummy draft from the store.
const initialDraft = {
  title: 'Draft Title',
  subject: 'Draft Subject',
  preheader: 'Draft Preheader',
  content: 'Draft Content',
  schedule: null,
  segmentId: '',
};

// Create a proper fake ParamMap.
const fakeParamMap: ParamMap = {
  get: jasmine.createSpy('get').and.returnValue(null),
  has: (name: string): boolean => false,
  getAll: (name: string): string[] => [],
  keys: [],
};

// Create a dummy ActivatedRouteSnapshot.
const fakeActivatedRouteSnapshot: ActivatedRouteSnapshot = {
  paramMap: fakeParamMap,
  queryParamMap: fakeParamMap,
  url: [],
  params: {},
  queryParams: {},
  fragment: '',
  data: {},
  outlet: '',
  component: null,
  routeConfig: null,
  root: {} as ActivatedRouteSnapshot,
  parent: null,
  firstChild: null,
  children: [],
  pathFromRoot: [],
  title: '',
  toString: () => '',
};

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: Partial<ActivatedRoute>;
  let store: MockStore;

  beforeEach(async () => {
    postsServiceSpy = jasmine.createSpyObj('PostsService', [
      'getPostById',
      'updatePost',
      'createPost',
      'sendNow',
    ]);
    // Set a default for getPostById so that if it’s called it returns an observable.
    postsServiceSpy.getPostById.and.returnValue(of({ post: initialDraft }));
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteStub = { snapshot: fakeActivatedRouteSnapshot };

    await TestBed.configureTestingModule({
      imports: [
        MainContentComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
      ],
      providers: [
        { provide: PostsService, useValue: postsServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        provideMockStore({ initialState: {} }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectDraft, initialDraft);

    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  describe('ngOnInit', () => {
    it('should subscribe to the store draft and update the newsletter', () => {
      expect(component.newsletter).toEqual(initialDraft);
    });

    it('should set editMode true and call loadPost if route contains an id', () => {
      // Simulate an ID in the route.
      (
        activatedRouteStub.snapshot!.paramMap.get as jasmine.Spy
      ).and.returnValue('123');
      // Override getPostById to return a valid observable.
      postsServiceSpy.getPostById.and.returnValue(of({ post: initialDraft }));
      // Spy on loadPost to allow us to check its call without running its implementation:
      spyOn(component, 'loadPost').and.callThrough();
      // Create a new instance to trigger ngOnInit.
      fixture = TestBed.createComponent(MainContentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component.editMode).toBeTrue();
      expect(component.loadPost).toHaveBeenCalledWith('123');
    });
  });

  describe('onFieldChange', () => {
    it('should update the newsletter field and dispatch an updateDraft action', () => {
      spyOn(store, 'dispatch');
      component.onFieldChange('title', 'New Title');
      expect(component.newsletter.title).toBe('New Title');
      expect(store.dispatch).toHaveBeenCalledWith(
        updateDraft({ partialDraft: { title: 'New Title' } })
      );
    });
  });

  describe('loadPost', () => {
    it('should update newsletter on successful load', () => {
      const postResponse = {
        post: {
          title: 'Loaded Title',
          subject: 'Loaded Subject',
          preheader: 'Loaded Preheader',
          content: 'Loaded Content',
          schedule: new Date('2025-01-01T00:00:00Z'),
        },
      };
      postsServiceSpy.getPostById.and.returnValue(of(postResponse));
      component.loadPost('123');
      expect(postsServiceSpy.getPostById).toHaveBeenCalledWith('123');
      expect(component.newsletter.title).toEqual('Loaded Title');
      expect(component.newsletter.schedule).toEqual(
        new Date('2025-01-01T00:00:00Z')
      );
    });

    it('should alert and navigate if loadPost fails', () => {
      spyOn(window, 'alert');
      postsServiceSpy.getPostById.and.returnValue(
        throwError(() => new Error('error'))
      );
      component.loadPost('123');
      expect(window.alert).toHaveBeenCalledWith('Error loading post');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/posts']);
    });
  });

  describe('saveChanges', () => {
    beforeEach(() => {
      component.postId = '123';
    });
    it('should update post and navigate on success', () => {
      spyOn(window, 'alert');
      postsServiceSpy.updatePost.and.returnValue(of({}));
      component.saveChanges();
      expect(postsServiceSpy.updatePost).toHaveBeenCalledWith(
        '123',
        component.newsletter
      );
      expect(window.alert).toHaveBeenCalledWith('Post updated successfully');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/posts']);
    });
    it('should alert error when update fails', () => {
      spyOn(window, 'alert');
      postsServiceSpy.updatePost.and.returnValue(
        throwError(() => ({ error: { message: 'Update Error' } }))
      );
      component.saveChanges();
      expect(window.alert).toHaveBeenCalledWith('Update Error');
    });
  });

  describe('fields validation via public methods', () => {
    it('should return false and set errorMsg when required fields are missing', () => {
      component.newsletter = {
        title: '',
        subject: '',
        preheader: '',
        content: '',
        schedule: null,
        segmentId: '',
      };
      component.saveAsDraft();
      expect(component.errorMsg).toBe('Please fill out all required fields.');
    });

    it('should clear errorMsg and open schedule modal when fields are valid', () => {
      component.newsletter = {
        title: 'A',
        subject: 'B',
        preheader: 'C',
        content: 'D',
        schedule: null,
        segmentId: '',
      };
      component.openScheduleModal();
      expect(component.errorMsg).toBe('');
      expect(component.showScheduleModal).toBeTrue();
    });
  });

  describe('saveAsDraft', () => {
    it('should not call createPost if fields are invalid', () => {
      spyOn(component as any, 'fieldsAreValid').and.returnValue(false);
      component.saveAsDraft();
      expect(postsServiceSpy.createPost).not.toHaveBeenCalled();
    });
    it('should call createPost and alert success on draft save', () => {
      spyOn(window, 'alert');
      spyOn(component as any, 'fieldsAreValid').and.returnValue(true);
      postsServiceSpy.createPost.and.returnValue(of({}));
      component.saveAsDraft();
      expect(postsServiceSpy.createPost).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Saved as draft!');
    });
    it('should alert error when draft save fails', () => {
      spyOn(window, 'alert');
      spyOn(component as any, 'fieldsAreValid').and.returnValue(true);
      postsServiceSpy.createPost.and.returnValue(
        throwError(() => ({ error: { message: 'Draft Error' } }))
      );
      component.saveAsDraft();
      expect(window.alert).toHaveBeenCalledWith('Draft Error');
    });
  });

  describe('openScheduleModal', () => {
    it('should set showScheduleModal to true if fields are valid', () => {
      spyOn(component as any, 'fieldsAreValid').and.returnValue(true);
      component.openScheduleModal();
      expect(component.showScheduleModal).toBeTrue();
    });
    it('should not open schedule modal if fields are invalid', () => {
      spyOn(component as any, 'fieldsAreValid').and.returnValue(false);
      component.openScheduleModal();
      expect(component.showScheduleModal).toBeFalse();
    });
  });

  describe('schedulePost', () => {
    const testDate = new Date('2025-01-01T00:00:00Z');
    it('should call createPost and alert success on scheduling', () => {
      spyOn(window, 'alert');
      postsServiceSpy.createPost.and.returnValue(of({}));
      component.showScheduleModal = true;
      component.schedulePost(testDate);
      expect(postsServiceSpy.createPost).toHaveBeenCalledWith(
        jasmine.objectContaining({
          status: 'scheduled',
          scheduledAt: testDate,
        })
      );
      expect(window.alert).toHaveBeenCalledWith(
        `Post scheduled for ${testDate}`
      );
      expect(component.showScheduleModal).toBeFalse();
    });
    it('should alert error on scheduling failure', () => {
      spyOn(window, 'alert');
      postsServiceSpy.createPost.and.returnValue(
        throwError(() => ({ error: { message: 'Schedule Error' } }))
      );
      component.schedulePost(testDate);
      expect(window.alert).toHaveBeenCalledWith('Schedule Error');
      expect(component.showScheduleModal).toBeFalse();
    });
  });

  describe('closeModal', () => {
    it('should set showScheduleModal to false', () => {
      component.showScheduleModal = true;
      component.closeModal();
      expect(component.showScheduleModal).toBeFalse();
    });
  });

  describe('sendNow', () => {
    it('should not proceed if fields are invalid', () => {
      spyOn(component as any, 'fieldsAreValid').and.returnValue(false);
      component.sendNow();
      expect(postsServiceSpy.createPost).not.toHaveBeenCalled();
    });
    it('should create post and then send newsletter on success', () => {
      spyOn(window, 'alert');
      spyOn(component as any, 'fieldsAreValid').and.returnValue(true);
      const fakePostId = 'post123';
      postsServiceSpy.createPost.and.returnValue(
        of({ post: { _id: fakePostId } })
      );
      postsServiceSpy.sendNow.and.returnValue(of({}));
      component.sendNow();
      expect(postsServiceSpy.createPost).toHaveBeenCalled();
      expect(postsServiceSpy.sendNow).toHaveBeenCalledWith(fakePostId);
      expect(window.alert).toHaveBeenCalledWith('Newsletter sent!');
    });
    it('should alert error if createPost fails', () => {
      spyOn(window, 'alert');
      spyOn(component as any, 'fieldsAreValid').and.returnValue(true);
      postsServiceSpy.createPost.and.returnValue(
        throwError(() => ({ error: { message: 'Create Error' } }))
      );
      component.sendNow();
      expect(window.alert).toHaveBeenCalledWith('Create Error');
    });
    it('should alert error if sendNow fails', () => {
      spyOn(window, 'alert');
      spyOn(component as any, 'fieldsAreValid').and.returnValue(true);
      const fakePostId = 'post123';
      postsServiceSpy.createPost.and.returnValue(
        of({ post: { _id: fakePostId } })
      );
      postsServiceSpy.sendNow.and.returnValue(
        throwError(() => ({ error: { message: 'Send Error' } }))
      );
      component.sendNow();
      expect(window.alert).toHaveBeenCalledWith('Send Error');
    });
    it('should alert if createPost returns no post ID', () => {
      spyOn(window, 'alert');
      spyOn(component as any, 'fieldsAreValid').and.returnValue(true);
      postsServiceSpy.createPost.and.returnValue(of({ post: {} }));
      component.sendNow();
      expect(window.alert).toHaveBeenCalledWith(
        'No post ID returned. Cannot send now.'
      );
    });
  });
});
