import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3AnalyticsComponent } from './d3-analytics.component';

describe('D3AnalyticsComponent', () => {
  let component: D3AnalyticsComponent;
  let fixture: ComponentFixture<D3AnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D3AnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D3AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
