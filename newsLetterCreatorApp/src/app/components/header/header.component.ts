import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  // Method to change the language
  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement; // Cast event.target to HTMLSelectElement
    const language = target.value; // Access the value property
    this.translate.use(language);

    // Handle RTL for Arabic
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.classList.remove('rtl');
    }
  }
}
