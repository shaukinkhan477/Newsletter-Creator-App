import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface TemplateOption {
  name: string;
  description: string;
  // possibly a default subject, content, or styles
  subject: string;
  preheader: string;
  content: string;
}

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.css',
})
export class TemplatesComponent {
  templates: TemplateOption[] = [
    {
      name: 'Minimal',
      description: 'A simple, no-frills layout for quick updates.',
      subject: 'Quick Update',
      preheader: 'Some short preheader text',
      content: `<h1>Welcome to our newsletter</h1>
                <p>This is a minimal template. Enjoy!</p>`,
    },
    {
      name: 'Business',
      description: 'A professional corporate style for business updates.',
      subject: 'Business Update',
      preheader: 'Keep reading for important news',
      content: `<h2>Corporate News</h2>
                <p>Dear Clients, we are excited to announce...</p>`,
    },
    {
      name: 'Creative',
      description: 'A more colorful template for creative announcements.',
      subject: 'Creative Launch',
      preheader: 'Time to get creative!',
      content: `<div style="background-color:lightblue; padding:10px;">
                  <h2 style="color:#333;">Hey, creators!</h2>
                  <p>Show your style with colors and images!</p>
                </div>`,
    },
  ];

  constructor(private router: Router) {}

  applyTemplate(template: TemplateOption) {
    // We'll navigate back to /home or main editor, passing template data
    this.router.navigate(['/home'], {
      queryParams: {
        subject: template.subject,
        preheader: template.preheader,
        content: template.content,
      },
    });
  }
}
