// schedule-modal.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleModalComponent } from './schedule-modal.component';

describe('ScheduleModalComponent', () => {
  let component: ScheduleModalComponent;
  let fixture: ComponentFixture<ScheduleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleModalComponent], // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleModalComponent);
    component = fixture.componentInstance;
    // Provide a default value for the input property so that template bindings don't fail.
    component.newsletter = { schedule: null };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClose event when closeModal is called', () => {
    spyOn(component.onClose, 'emit');
    component.closeModal();
    expect(component.onClose.emit).toHaveBeenCalled();
  });

  it('should alert if newsletter.schedule is not provided when schedule is called', () => {
    spyOn(window, 'alert');
    // Ensure newsletter.schedule is falsy.
    component.newsletter = { schedule: null };
    component.schedule();
    expect(window.alert).toHaveBeenCalledWith(
      'Please choose a date/time for scheduling.'
    );
  });

  it('should emit onSchedule event when newsletter.schedule is provided', () => {
    spyOn(component.onSchedule, 'emit');
    const testDate = new Date();
    component.newsletter = { schedule: testDate };
    component.schedule();
    expect(component.onSchedule.emit).toHaveBeenCalledWith(testDate);
  });
});
