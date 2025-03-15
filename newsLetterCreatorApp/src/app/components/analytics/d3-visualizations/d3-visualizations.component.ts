import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { geoPath, geoNaturalEarth1, geoAlbersUsa } from 'd3-geo';
import { hierarchy, HierarchyRectangularNode, partition } from 'd3-hierarchy';

// Define the data type for the icicle diagram
interface ThemeData {
  name: string;
  children?: ThemeData[];
  value?: number;
}

@Component({
  selector: 'app-d3-visualizations',
  standalone: true,
  templateUrl: './d3-visualizations.component.html',
  styleUrls: ['./d3-visualizations.component.css'],
})
export class D3VisualizationsComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  @ViewChild('icicleContainer', { static: true }) icicleContainer!: ElementRef;

  // Sample hierarchical data for the icicle diagram.
  icicleData: ThemeData = {
    name: 'Themes',
    children: [
      { name: 'Promotions', value: 100 },
      { name: 'News', value: 80 },
      { name: 'Updates', value: 50 },
      { name: 'Social', value: 30 },
    ],
  };

  // Variables for the interactive icicle
  private icicleSvg: any;
  private icicleRoot!: HierarchyRectangularNode<ThemeData>;
  private xScale: d3.ScaleLinear<number, number> = d3.scaleLinear();
  private yScale: d3.ScaleLinear<number, number> = d3.scaleLinear();
  private currentRoot!: HierarchyRectangularNode<ThemeData>;

  constructor() {}

  ngOnInit(): void {
    this.drawMap();
    this.drawIcicle();
  }

  drawMap(): void {
    const element = this.mapContainer.nativeElement;
    const width = element.offsetWidth || 600;
    const height = 400;

    // Create the SVG and add zoom/pan behavior.
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .call(
        d3
          .zoom<SVGSVGElement, unknown>()
          .scaleExtent([1, 8])
          .on('zoom', (event) => {
            g.attr('transform', event.transform);
          })
      )
      .append('g');

    // Append a background rectangle.
    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#e0f7fa');

    // Group for markers.
    const g = svg.append('g');

    // Setup Natural Earth projection.
    const projection = geoNaturalEarth1()
      .scale(width / 6.5)
      .translate([width / 2, height / 2]);

    // Create a tooltip div within the container.
    const tooltip = d3
      .select(this.mapContainer.nativeElement)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // Define sample points (with coordinates as a tuple and a location label).
    interface SamplePoint {
      coordinates: [number, number];
      location: string;
    }
    const samplePoints: SamplePoint[] = [
      { coordinates: [0, 0], location: 'Equator' },
      { coordinates: [10, 45], location: 'Europe' },
      { coordinates: [-75, 40], location: 'USA' },
      { coordinates: [120, 30], location: 'Asia' },
    ];

    // Draw markers and add tooltip interactivity.
    g.selectAll('circle')
      .data(samplePoints)
      .enter()
      .append('circle')
      .attr('cx', (d: SamplePoint) => {
        const p = projection(d.coordinates)!;
        return p[0];
      })
      .attr('cy', (d: SamplePoint) => {
        const p = projection(d.coordinates)!;
        return p[1];
      })
      .attr('r', 5)
      .attr('fill', 'red')
      .on(
        'mouseover',
        function (this: SVGCircleElement, event: MouseEvent, d: SamplePoint) {
          tooltip.transition().duration(200).style('opacity', 0.9);
          tooltip
            .html(
              `<strong>${d.location}</strong><br/>[${d.coordinates[0]}, ${d.coordinates[1]}]`
            )
            .style('left', event.pageX + 5 + 'px')
            .style('top', event.pageY - 28 + 'px');
        }
      )
      .on('mouseout', function (this: SVGCircleElement) {
        tooltip.transition().duration(500).style('opacity', 0);
      });
  }

  drawIcicle(): void {
    const element = this.icicleContainer.nativeElement;
    const width = element.offsetWidth || 600;
    const height = 400;

    // Create an SVG container for the icicle diagram.
    this.icicleSvg = d3
      .select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Build the hierarchical structure and compute the partition layout.
    this.icicleRoot = hierarchy(this.icicleData)
      .sum((d) => d.value || 0)
      .sort(
        (a, b) => (b.value || 0) - (a.value || 0)
      ) as HierarchyRectangularNode<ThemeData>;
    partition<ThemeData>().size([width, height])(this.icicleRoot);
    this.currentRoot = this.icicleRoot;

    // Define scales for zooming.
    this.xScale = d3
      .scaleLinear()
      .domain([this.icicleRoot.x0!, this.icicleRoot.x1!])
      .range([0, width]);
    this.yScale = d3
      .scaleLinear()
      .domain([this.icicleRoot.y0!, this.icicleRoot.y1!])
      .range([0, height]);

    // Create a color scale.
    const color = d3
      .scaleOrdinal<string>()
      .domain(this.icicleRoot.descendants().map((d) => d.data.name))
      .range(d3.schemeCategory10);

    // Draw rectangles for each node.
    this.icicleSvg
      .selectAll('rect')
      .data(this.icicleRoot.descendants())
      .enter()
      .append('rect')
      .attr('x', (d: HierarchyRectangularNode<ThemeData>) => this.xScale(d.x0!))
      .attr('y', (d: HierarchyRectangularNode<ThemeData>) => this.yScale(d.y0!))
      .attr(
        'width',
        (d: HierarchyRectangularNode<ThemeData>) =>
          this.xScale(d.x1!) - this.xScale(d.x0!)
      )
      .attr(
        'height',
        (d: HierarchyRectangularNode<ThemeData>) =>
          this.yScale(d.y1!) - this.yScale(d.y0!)
      )
      .attr('fill', (d: HierarchyRectangularNode<ThemeData>) =>
        color(d.data.name)
      )
      .attr('stroke', '#fff')
      .style('cursor', 'pointer')
      .on(
        'click',
        (event: MouseEvent, d: HierarchyRectangularNode<ThemeData>) => {
          this.zoomIcicle(d);
        }
      )
      .on('mouseover', function (this: SVGRectElement) {
        d3.select(this).attr('opacity', 0.7);
      })
      .on('mouseout', function (this: SVGRectElement) {
        d3.select(this).attr('opacity', 1);
      });

    // Draw labels for non-root nodes.
    this.icicleSvg
      .selectAll('text')
      .data(
        this.icicleRoot
          .descendants()
          .filter((d: HierarchyRectangularNode<ThemeData>) => d.depth > 0)
      )
      .enter()
      .append('text')
      .attr(
        'x',
        (d: HierarchyRectangularNode<ThemeData>) => this.xScale(d.x0!) + 4
      )
      .attr(
        'y',
        (d: HierarchyRectangularNode<ThemeData>) => this.yScale(d.y0!) + 20
      )
      .text((d: HierarchyRectangularNode<ThemeData>) => d.data.name)
      .attr('font-size', '12px')
      .attr('fill', '#fff')
      .style('pointer-events', 'none');
  }

  // Zoom function for the icicle diagram.
  zoomIcicle(d: HierarchyRectangularNode<ThemeData>): void {
    const element = this.icicleContainer.nativeElement;
    const width = element.offsetWidth || 600;
    const height = 400;

    this.currentRoot = d;

    // Update scales based on the clicked node.
    this.xScale.domain([d.x0!, d.x1!]);
    this.yScale.domain([d.y0!, height]).range([d.depth ? 20 : 0, height]);

    // Transition rectangles to new positions.
    this.icicleSvg
      .selectAll('rect')
      .transition()
      .duration(750)
      .attr('x', (d: HierarchyRectangularNode<ThemeData>) => this.xScale(d.x0!))
      .attr('y', (d: HierarchyRectangularNode<ThemeData>) => this.yScale(d.y0!))
      .attr(
        'width',
        (d: HierarchyRectangularNode<ThemeData>) =>
          this.xScale(d.x1!) - this.xScale(d.x0!)
      )
      .attr(
        'height',
        (d: HierarchyRectangularNode<ThemeData>) =>
          this.yScale(d.y1!) - this.yScale(d.y0!)
      );

    // Transition labels.
    this.icicleSvg
      .selectAll('text')
      .transition()
      .duration(750)
      .attr(
        'x',
        (d: HierarchyRectangularNode<ThemeData>) => this.xScale(d.x0!) + 4
      )
      .attr(
        'y',
        (d: HierarchyRectangularNode<ThemeData>) => this.yScale(d.y0!) + 20
      );
  }
}
