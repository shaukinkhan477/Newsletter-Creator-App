import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TemplateService } from '../../services/templates.service';
import { NewsletterTemplate, TemplateCategory } from '../../models/templates.model';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
})
export class TemplatesComponent implements OnInit {
  categories: TemplateCategory[];
  selectedCategory = 'Holiday';
  loadingTemplates: boolean = true;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private templateService: TemplateService
  ) {
    this.categories = this.templateService.getCategories();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadingTemplates = false;
    }, 1000);
  }

  get currentTemplates() {
    return this.templateService.getTemplatesByCategory(this.selectedCategory);
  }

  selectCategory(categoryName: string) {
    this.selectedCategory = categoryName;
  }

  getSafeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  applyTemplate(tmpl: NewsletterTemplate) {
    this.router.navigate(['/resume'], {
      queryParams: {
        title: tmpl.title,
        subject: tmpl.subject,
        preheader: tmpl.preheader,
        content: tmpl.content,
      },
    });
  }
}
