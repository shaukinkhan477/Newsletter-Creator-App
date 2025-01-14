import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BaseChartDirective } from 'ng2-charts';

import { Newsletter } from '../../models/newsletter.model';
import { Segment } from '../../models/segment.model';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorModule, BaseChartDirective],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent {
  @Input() newsletter!: Newsletter;
  @Input() segments!: Segment[];
  @Input() expectedOpenRate!: number;
  @Input() expectedClickRate!: number;
  @Input() chartData: any;
  @Input() chartOptions: any;
  @Input() seoScore!: number;
  @Input() seoTips!: { text: string; done: boolean }[];

  @Output() onSaveDraft = new EventEmitter<void>();
  @Output() onOpenSchedule = new EventEmitter<void>();

  public isBrowser: boolean;

  editorConfig = {
    height: 500,
    menubar: true,
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'uploadimage',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'code',
      'help',
      'wordcount',
      'colorpicker',
    ],
    toolbar:
      'undo redo | blocks preview | bold italic forecolor backcolor | alignleft aligncenter alignright | ' +
      'bullist numlist outdent indent | link image | code ',
  };

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private sharedDataService: SharedDataService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  saveAsDraft() {
     alert('Post saved as draft!');
  }

  openScheduleModal() {
    this.sharedDataService.updateShowScheduleModal(true);
  }

  getSEOScoreColor(): string {
    if (this.seoScore >= 80) return '#10b981';
    if (this.seoScore >= 60) return '#f59e0b';
    return '#ef4444';
  }

  getTotalSubscribers(): number {
    return (
      this.segments?.reduce(
        (total, segment) => total + segment.subscriberCount,
        0
      ) || 0
    );
  }


  ngOnInit() {
    this.sharedDataService.currentNewsletter.subscribe((data) => (this.newsletter = data));
    this.sharedDataService.currentSegments.subscribe((data) => (this.segments = data));
    this.sharedDataService.currentExpectedOpenRate.subscribe((rate) => (this.expectedOpenRate = rate));
    this.sharedDataService.currentExpectedClickRate.subscribe((rate) => (this.expectedClickRate = rate));
    this.sharedDataService.currentSeoScore.subscribe((score) => (this.seoScore = score));
    this.sharedDataService.currentSeoTips.subscribe((tips) => (this.seoTips = tips));
    this.sharedDataService.currentChartData.subscribe((data) => (this.chartData = data));
    this.sharedDataService.currentChartOptions.subscribe((options) => (this.chartOptions = options));
  }
}
