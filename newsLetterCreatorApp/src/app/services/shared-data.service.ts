import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private newsletterSource = new BehaviorSubject<any>(null);
  currentNewsletter = this.newsletterSource.asObservable();

  private segmentsSource = new BehaviorSubject<any>(null);
  currentSegments = this.segmentsSource.asObservable();

  private expectedOpenRateSource = new BehaviorSubject<number>(0);
  currentExpectedOpenRate = this.expectedOpenRateSource.asObservable();

  private expectedClickRateSource = new BehaviorSubject<number>(0);
  currentExpectedClickRate = this.expectedClickRateSource.asObservable();

  private seoScoreSource = new BehaviorSubject<number>(0);
  currentSeoScore = this.seoScoreSource.asObservable();

  private seoTipsSource = new BehaviorSubject<any[]>([]);
  currentSeoTips = this.seoTipsSource.asObservable();

  private chartDataSource = new BehaviorSubject<any>(null);
  currentChartData = this.chartDataSource.asObservable();

  private chartOptionsSource = new BehaviorSubject<any>(null);
  currentChartOptions = this.chartOptionsSource.asObservable();

  private showScheduleModalSource = new BehaviorSubject<boolean>(false);
  currentShowScheduleModal = this.showScheduleModalSource.asObservable();

  updateNewsletter(newsletter: any) {
    this.newsletterSource.next(newsletter);
  }

  updateSegments(segments: any) {
    this.segmentsSource.next(segments);
  }

  updateExpectedOpenRate(rate: number) {
    this.expectedOpenRateSource.next(rate);
  }

  updateExpectedClickRate(rate: number) {
    this.expectedClickRateSource.next(rate);
  }

  updateSeoScore(score: number) {
    this.seoScoreSource.next(score);
  }

  updateSeoTips(tips: any[]) {
    this.seoTipsSource.next(tips);
  }

  updateChartData(data: any) {
    this.chartDataSource.next(data);
  }

  updateChartOptions(options: any) {
    this.chartOptionsSource.next(options);
  }

  updateShowScheduleModal(show: boolean) {
    this.showScheduleModalSource.next(show);
  }
}
