import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AnalyticsService, CustomerStats, EmailStats } from '../../services/analytics.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { D3VisualizationsComponent } from './d3-visualizations/d3-visualizations.component';

// Define allowed chart types for our dashboard
type AllowedChartTypes = 'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, D3VisualizationsComponent],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {
  selectedPeriod: 'daily' | 'weekly' | 'monthly' = 'daily';

  // Use a union type for chartType so we can support multiple chart types.
  chartType: AllowedChartTypes = 'bar';

  // Note: Adjust the generic to include the allowed chart types.
  chartData: ChartData<
    'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar'
  > = {
    labels: [],
    datasets: [],
  };

  chartOptions: ChartConfiguration<
    'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar'
  >['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e7eb',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: '#374151',
      },
    },
  };

  customerStats: CustomerStats[] = [];
  isBrowser: boolean;

  // List available chart types for selection in the UI.
  availableChartTypes: AllowedChartTypes[] = [
    'bar',
    'line',
    'pie',
    'doughnut',
    'polarArea',
    'radar',
  ];

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

  // Handle chart type selection changes.
  onChartTypeChange(newType: string) {
    // Validate and cast the newType to AllowedChartTypes
    if (this.availableChartTypes.includes(newType as AllowedChartTypes)) {
      this.chartType = newType as AllowedChartTypes;
      // Refresh chart data if necessary
      this.analyticsService
        .getEmailStatsByPeriod(this.selectedPeriod)
        .subscribe((stats) => {
          this.updateChartData(stats);
        });
    }
  }

  updateChartData(stats: EmailStats[]) {
    const labels = stats.map((stat) => stat.period);
    const sentData = stats.map((stat) => stat.sentCount);
    const clickedData = stats.map((stat) => stat.clickedCount);

    // For pie/doughnut/polarArea charts, use a single dataset (e.g., total emails)
    if (
      this.chartType === 'pie' ||
      this.chartType === 'doughnut' ||
      this.chartType === 'polarArea'
    ) {
      this.chartData = {
        labels,
        datasets: [
          {
            label: 'Total Emails',
            data: sentData.map((sent, i) => sent + clickedData[i]),
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(234, 179, 8, 0.7)',
              'rgba(244, 63, 94, 0.7)',
              'rgba(96, 165, 250, 0.7)',
              'rgba(139, 92, 246, 0.7)',
            ],
            borderColor: [
              'rgba(59, 130, 246, 1)',
              'rgba(16, 185, 129, 1)',
              'rgba(234, 179, 8, 1)',
              'rgba(244, 63, 94, 1)',
              'rgba(96, 165, 250, 1)',
              'rgba(139, 92, 246, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    } else {
      // For bar, line, and radar charts, use separate datasets.
      this.chartData = {
        labels,
        datasets: [
          {
            label: 'Emails Sent',
            data: sentData,
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
            borderRadius: 5,
          },
          {
            label: 'Emails Clicked',
            data: clickedData,
            backgroundColor: 'rgba(16, 185, 129, 0.7)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 1,
            borderRadius: 5,
          },
        ],
      };
    }
  }

  trackClick() {
    this.analyticsService.trackEventWithThirdParty(
      'meta',
      'UserClickedAnalyticsButton'
    );
  }
}
