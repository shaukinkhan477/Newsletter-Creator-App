import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TemplateService } from '../../services/templates.service';
import { NewsletterTemplate, TemplateCategory } from '../../models/templates.model';
// import { TemplateService } from './template.service';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
})
export class TemplatesComponent {
  categories: TemplateCategory[];
  selectedCategory = 'Holiday';

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private templateService: TemplateService
  ) {
    this.categories = this.templateService.getCategories();
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
