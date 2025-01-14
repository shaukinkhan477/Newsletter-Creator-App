import { Component, Inject, Input, PLATFORM_ID, Renderer2 } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { NgChartsModule } from 'ng2-charts';
import { Newsletter } from '../../models/newsletter.model';
import { Segment } from '../../models/segment.model';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective,],
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
})
export class RightSidebarComponent {
  @Input() newsletter!: Newsletter;
  @Input() segments!: Segment[];
  @Input() expectedOpenRate!: number;
  @Input() expectedClickRate!: number;
  @Input() chartData: any;
  @Input() chartOptions: any;
  @Input() seoScore!: number;
  @Input() seoTips!: { text: string; done: boolean }[];

  // For dynamic function input, we must pass a bound method
  // from the parent (or convert them to @Output events).
  @Input() getSEOScoreColor!: () => string;
  @Input() getTotalSubscribers!: () => number;

  public isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private renderer2: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
}
