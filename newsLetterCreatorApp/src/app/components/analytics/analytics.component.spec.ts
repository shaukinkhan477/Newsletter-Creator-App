// analytics.component.spec.ts

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AnalyticsComponent } from './analytics.component';
import {
  AnalyticsService,
  CustomerStats,
  EmailStats,
} from '../../services/analytics.service';
import { of } from 'rxjs';
import { PLATFORM_ID, Renderer2 } from '@angular/core';

// Import Chart and register all required components from Chart.js.
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;
  let analyticsServiceSpy: jasmine.SpyObj<AnalyticsService>;

  // Dummy data for email stats (for the chart)
  const dummyEmailStats: EmailStats[] = [
    { period: 'Monday', sentCount: 10, clickedCount: 5 },
    { period: 'Tuesday', sentCount: 15, clickedCount: 7 },
  ];

  // Dummy data for customer stats
  const dummyCustomerStats: CustomerStats[] = [
    { id: '1', name: 'Customer A', purchases: 3 } as any,
    { id: '2', name: 'Customer B', purchases: 5 } as any,
  ];

  beforeEach(async () => {
    // Create a spy for AnalyticsService with the needed methods.
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'getEmailStatsByPeriod',
      'getCustomerStats',
      'trackEventWithThirdParty',
    ]);

    // Setup spies to return dummy observables.
    analyticsServiceSpy.getEmailStatsByPeriod.and.returnValue(
      of(dummyEmailStats)
    );
    analyticsServiceSpy.getCustomerStats.and.returnValue(
      of(dummyCustomerStats)
    );
    analyticsServiceSpy.trackEventWithThirdParty.and.stub();

    await TestBed.configureTestingModule({
      imports: [AnalyticsComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        // Provide a minimal Renderer2 spy.
        {
          provide: Renderer2,
          useValue: jasmine.createSpyObj('Renderer2', [
            'addClass',
            'removeClass',
          ]),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadPeriodData and update chartData based on email stats', () => {
    // Call loadPeriodData explicitly.
    component.loadPeriodData();
    expect(analyticsServiceSpy.getEmailStatsByPeriod).toHaveBeenCalledWith(
      component.selectedPeriod
    );

    // The updateChartData() method should update chartData with stats data.
    const expectedLabels = dummyEmailStats.map((s) => s.period);
    const expectedSentData = dummyEmailStats.map((s) => s.sentCount);
    const expectedClickedData = dummyEmailStats.map((s) => s.clickedCount);
    expect(component.chartData.labels).toEqual(expectedLabels);
    expect(component.chartData.datasets[0].data).toEqual(expectedSentData);
    expect(component.chartData.datasets[1].data).toEqual(expectedClickedData);
  });

  it('should call loadCustomerStats and update customerStats', () => {
    component.loadCustomerStats();
    expect(analyticsServiceSpy.getCustomerStats).toHaveBeenCalled();
    expect(component.customerStats).toEqual(dummyCustomerStats);
  });

  it('should track "Viewed Analytics" event on init', () => {
    // ngOnInit calls loadPeriodData, loadCustomerStats, and then:
    expect(analyticsServiceSpy.trackEventWithThirdParty).toHaveBeenCalledWith(
      'google',
      'Viewed Analytics'
    );
  });

  it('should update selectedPeriod and reload period data on onPeriodChange', () => {
    component.onPeriodChange('weekly');
    expect(component.selectedPeriod).toBe('weekly');
    expect(analyticsServiceSpy.getEmailStatsByPeriod).toHaveBeenCalledWith(
      'weekly'
    );
  });

  it('should update chartData correctly when updateChartData is called', () => {
    const newStats: EmailStats[] = [
      { period: 'Wed', sentCount: 20, clickedCount: 10 },
      { period: 'Thu', sentCount: 25, clickedCount: 15 },
    ];
    component.updateChartData(newStats);
    expect(component.chartData.labels).toEqual(newStats.map((s) => s.period));
    expect(component.chartData.datasets[0].data).toEqual(
      newStats.map((s) => s.sentCount)
    );
    expect(component.chartData.datasets[1].data).toEqual(
      newStats.map((s) => s.clickedCount)
    );
  });

  it('should call trackEventWithThirdParty with "meta", "UserClickedAnalyticsButton" when trackClick is called', () => {
    component.trackClick();
    expect(analyticsServiceSpy.trackEventWithThirdParty).toHaveBeenCalledWith(
      'meta',
      'UserClickedAnalyticsButton'
    );
  });

  it('should set isBrowser to true when PLATFORM_ID is "browser"', () => {
    expect(component.isBrowser).toBeTrue();
  });
});
