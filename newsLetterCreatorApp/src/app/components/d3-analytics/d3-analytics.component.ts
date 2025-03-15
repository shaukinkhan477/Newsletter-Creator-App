import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';
import { AnalyticsService, EmailStats } from '../../services/analytics.service';

@Component({
  selector: 'app-d3-analytics',
  standalone: true,
  imports: [],
  templateUrl: './d3-analytics.component.html',
  styleUrl: './d3-analytics.component.css',
})
export class D3AnalyticsComponent implements OnInit, AfterViewInit {
  @ViewChild('chart')
  private chartContainer!: ElementRef;
  selectedPeriod: 'daily' | 'weekly' | 'monthly' = 'daily';
  emailStats: EmailStats[] = [];

  // D3 configuration variables
  private svg: any;
  private margin = { top: 20, right: 30, bottom: 50, left: 50 };
  private width!: number;
  private height!: number;
  private tooltip: any;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadPeriodData();
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  loadPeriodData(): void {
    this.analyticsService.getEmailStatsByPeriod(this.selectedPeriod).subscribe(stats => {
      this.emailStats = stats;
      this.updateChart();
    });
  }

  onPeriodChange(period: 'daily' | 'weekly' | 'monthly'): void {
    this.selectedPeriod = period;
    this.loadPeriodData();
  }

  createChart(): void {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;

    // Create tooltip element
    this.tooltip = d3.select(element)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // Create the SVG element
    this.svg = d3.select(element)
      .append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', 400)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // Add groups for axes
    this.svg.append('g').attr('class', 'x-axis')
      .attr('transform', `translate(0,${this.height})`);
    this.svg.append('g').attr('class', 'y-axis');

    this.updateChart();
  }

  updateChart(): void {
    if (!this.svg) { return; }

    // Define subgroups for the grouped bar chart
    const subgroups: (keyof EmailStats)[] = ['sentCount', 'clickedCount'];

    // Groups are the time periods
    const groups = this.emailStats.map(d => d.period);

    // Create scales: x0 for groups and x1 for subgroups
    const x0 = d3.scaleBand()
      .domain(groups)
      .range([0, this.width])
      .padding(0.3);

    const x1 = d3.scaleBand()
      .domain(subgroups)
      .range([0, x0.bandwidth()])
      .padding(0.05);

    // Y scale based on the max value between sent and clicked
    const yMax = d3.max(this.emailStats, d => Math.max(d.sentCount, d.clickedCount)) || 0;
    const y = d3.scaleLinear()
      .domain([0, yMax])
      .range([this.height, 0]);

    // Color scale for bars
    const color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#3B82F6', '#10B981']);

    // Update X and Y axes
    this.svg.select('.x-axis')
      .transition().duration(750)
      .call(d3.axisBottom(x0));

    this.svg.select('.y-axis')
      .transition().duration(750)
      .call(d3.axisLeft(y));

    // Bind data for groups
    const groupSelection = this.svg.selectAll('.group')
      .data(this.emailStats, (d: EmailStats) => d.period);

    // Remove groups that no longer exist
    groupSelection.exit().remove();

    // Append new groups
    const groupsEnter = groupSelection.enter()
      .append('g')
      .attr('class', 'group')
      .attr('transform', (d: EmailStats) => `translate(${x0(d.period)},0)`);

    // Merge groups and update transform
    const groupsMerged = groupsEnter.merge(groupSelection as any)
      .attr('transform', (d: EmailStats) => `translate(${x0(d.period)},0)`);

    // Bind data for each subgroup (bars) within a group
    const bars = groupsMerged.selectAll('rect')
      .data((d: EmailStats) => subgroups.map(key => ({ key, value: d[key], period: d.period })));

    // Remove old bars
    bars.exit().remove();

    // Update existing bars with transition
    bars.transition().duration(750)
      .attr('x', (d: any) => x1(d.key))
      .attr('y', (d: any) => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', (d: any) => this.height - y(d.value))
      .attr('fill', (d: any) => color(d.key));

    // Append new bars
    bars.enter().append('rect')
      .attr('x', (d: any) => x1(d.key))
      .attr('y', this.height)
      .attr('width', x1.bandwidth())
      .attr('height', 0)
      .attr('fill', (d: any) => color(d.key))
      .on('mouseover', (event: MouseEvent, d: any) => {
        d3.select(event.currentTarget as HTMLElement).attr('opacity', 0.7);
        this.tooltip.transition().duration(200)
          .style('opacity', 0.9);
        this.tooltip.html(`<strong>${d.key === 'sentCount' ? 'Emails Sent' : 'Emails Clicked'}:</strong> ${d.value}`)
          .style('left', (event.offsetX + 20) + 'px')
          .style('top', (event.offsetY - 28) + 'px');
      })
      .on('mouseout', (event: MouseEvent, d: any) => {
        d3.select(event.currentTarget as HTMLElement).attr('opacity', 1);
        this.tooltip.transition().duration(500)
          .style('opacity', 0);
      })
      .transition().duration(750)
      .attr('y', (d: any) => y(d.value))
      .attr('height', (d: any) => this.height - y(d.value));
  }
}
