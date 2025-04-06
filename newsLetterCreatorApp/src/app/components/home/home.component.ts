import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FooterSectionComponent } from "../../home-page-sections/footer-section/footer-section.component";
import { CtaSectionComponent } from "../../home-page-sections/cta-section/cta-section.component";
import { PricingSectionComponent } from "../../home-page-sections/pricing-section/pricing-section.component";
import { TestimonialsSectionComponent } from "../../home-page-sections/testimonials-section/testimonials-section.component";
import { FeaturesSectionComponent } from "../../home-page-sections/features-section/features-section.component";
import { HeroSectionComponent } from "../../home-page-sections/hero-section/hero-section.component";
import { WhyChooseSectionComponent } from "../../home-page-sections/why-choose-section/why-choose-section.component";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgxSkeletonLoaderModule, FooterSectionComponent, CtaSectionComponent, PricingSectionComponent, TestimonialsSectionComponent, FeaturesSectionComponent, HeroSectionComponent, WhyChooseSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onGetStarted() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    // Simulate loading delay
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
