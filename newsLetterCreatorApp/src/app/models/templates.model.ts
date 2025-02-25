export interface NewsletterTemplate {
  name: string;
  title: string;
  description: string;
  subject: string;
  preheader: string;
  content: string;
}

export interface TemplateCategory {
  name: string; // e.g. 'Holiday', 'Fashion'...
  templates: NewsletterTemplate[];
}
