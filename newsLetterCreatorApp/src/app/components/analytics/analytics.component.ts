import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import {
  AnalyticsService,
  CustomerStats,
  EmailStats,
} from '../../services/analytics.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent implements OnInit {
  selectedPeriod: 'daily' | 'weekly' | 'monthly' = 'daily';

  // Define chart properties with specific bar type
  chartType = 'bar' as const;
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };
  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  customerStats: CustomerStats[] = [];
  public isBrowser: boolean;
  constructor(
    private analyticsService: AnalyticsService,
    @Inject(PLATFORM_ID) platformId: Object,
    private renderer2: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadPeriodData();
    this.loadCustomerStats();
    this.analyticsService.trackEventWithThirdParty(
      'google',
      'Viewed Analytics'
    );
  }

  loadPeriodData() {
    this.analyticsService
      .getEmailStatsByPeriod(this.selectedPeriod)
      .subscribe((stats) => {
        this.updateChartData(stats);
      });
  }

  loadCustomerStats() {
    this.analyticsService.getCustomerStats().subscribe((stats) => {
      this.customerStats = stats;
    });
  }

  onPeriodChange(period: 'daily' | 'weekly' | 'monthly') {
    this.selectedPeriod = period;
    this.loadPeriodData();
  }

  updateChartData(stats: EmailStats[]) {
    const labels = stats.map((s) => s.period);
    const sentData = stats.map((s) => s.sentCount);
    const clickedData = stats.map((s) => s.clickedCount);

    this.chartData = {
      labels,
      datasets: [
        {
          label: 'Emails Sent',
          data: sentData,
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
        {
          label: 'Emails Clicked',
          data: clickedData,
          backgroundColor: 'rgba(16, 185, 129, 0.7)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 1,
        },
      ],
    };
  }

  trackClick() {
    this.analyticsService.trackEventWithThirdParty(
      'meta',
      'UserClickedAnalyticsButton'
    );
  }
}
