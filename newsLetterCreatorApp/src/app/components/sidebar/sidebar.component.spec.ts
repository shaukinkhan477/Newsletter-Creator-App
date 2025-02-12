// sidebar.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';

// Define a simple fake loader that returns an empty translation object.
class FakeLoader implements TranslateLoader {
  getTranslation(lang: string) {
    return of({});
  }
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent, // Standalone component
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
      ],
      providers: [
        // Provide a minimal stub for ActivatedRoute.
        { provide: ActivatedRoute, useValue: { snapshot: {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have isCollapsed false by default', () => {
    expect(component.isCollapsed).toBeFalse();
  });

  it('should toggle isCollapsed and emit the new value when toggle() is called', () => {
    spyOn(component.toggleSidebar, 'emit');

    // Toggle once: expect isCollapsed to become true.
    component.toggle();
    expect(component.isCollapsed).toBeTrue();
    expect(component.toggleSidebar.emit).toHaveBeenCalledWith(true);

    // Toggle again: expect isCollapsed to become false.
    component.toggle();
    expect(component.isCollapsed).toBeFalse();
    expect(component.toggleSidebar.emit).toHaveBeenCalledWith(false);
  });
});
