import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Newsletter } from './models/newsletter.model';
import { Segment } from './models/segment.model';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ScheduleModalComponent } from "./components/schedule-modal/schedule-modal.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { SharedDataService } from './services/shared-data.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    SidebarComponent,
    ScheduleModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'newsLetterCreatorApp';

  constructor(private sharedDataService: SharedDataService) {}

  newsletter: Newsletter = {
    title: '',
    subject: '',
    content: '',
    preheader: '',
    schedule: null,
    segmentId: '',
  };

  segments: Segment[] = [
    { id: 'active', name: 'Active Subscribers', subscriberCount: 2500 },
    { id: 'premium', name: 'Premium Members', subscriberCount: 500 },
    { id: 'new', name: 'New Subscribers', subscriberCount: 750 },
  ];

  showScheduleModal = false;
  expectedOpenRate = 45;
  expectedClickRate = 12;
  seoScore = 85;
  seoTips = [
    { text: 'Title includes keywords', done: true },
    { text: 'Content length is optimal', done: true },
    { text: 'Add more internal links', done: false },
    { text: 'Optimize images', done: false },
  ];

  // Chart data
  chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Expected Engagement',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.1,
      },
    ],
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  ngOnInit() {
    // Initialize and share data
    this.sharedDataService.updateNewsletter(this.newsletter);
    this.sharedDataService.updateSegments(this.segments);
    this.sharedDataService.updateExpectedOpenRate(this.expectedOpenRate);
    this.sharedDataService.updateExpectedClickRate(this.expectedClickRate);
    this.sharedDataService.updateSeoScore(this.seoScore);
    this.sharedDataService.updateSeoTips(this.seoTips);
    this.sharedDataService.updateChartData(this.chartData);
    this.sharedDataService.updateChartOptions(this.chartOptions);
    this.sharedDataService.currentShowScheduleModal.subscribe((show) => {
      this.showScheduleModal = show;
    });
  }

  getTotalSubscribers(): number {
    return this.segments.reduce(
      (total, segment) => total + segment.subscriberCount,
      0
    );
  }

  getSEOScoreColor(): string {
    if (this.seoScore >= 80) return '#10b981';
    if (this.seoScore >= 60) return '#f59e0b';
    return '#ef4444';
  }

  scheduleNewsletter(dateTime: Date | null) {
    if (!dateTime) return;
    this.newsletter.schedule = dateTime;
    alert(`Newsletter scheduled for ${this.newsletter.schedule}`);
    this.sharedDataService.updateShowScheduleModal(false); // Close the modal
  }
}
