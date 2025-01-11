import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
// import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

import { Newsletter } from './models/newsletter.model';
import { Segment } from './models/segment.model';

// Import child components
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { ScheduleModalComponent } from './components/schedule-modal/schedule-modal.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    EditorModule,

    SidebarComponent,
    MainContentComponent,
    RightSidebarComponent,
    ScheduleModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'newsLetterCreatorApp';

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
    // Initialize any necessary data
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

  saveAsDraft() {
    alert('Post saved as draft!');
  }

  scheduleNewsletter(dateTime: Date | null) {
    if (!dateTime) return;
    this.newsletter.schedule = dateTime;
    alert(`Newsletter scheduled for ${this.newsletter.schedule}`);
    this.showScheduleModal = false;
  }
}
