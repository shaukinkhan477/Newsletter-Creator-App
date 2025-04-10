import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit{

  isDarkMode: boolean = false;
  isLoggedIn: boolean = false;
  
  constructor(private router: Router,
    private translate: TranslateService,
    private authService: AuthService,
    private themeService: ThemeService) {
    translate.setDefaultLang('en');
  }

    ngOnInit(): void {
    this.themeService.darkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });

    this.authService.loggedIn$.subscribe((loggedIn) => {
    this.isLoggedIn = loggedIn;
    });
      
  }
  

  goToProfile() {
    this.router.navigate(['/profile']);
  }

   login(): void {
    this.router.navigate(['/login']);
  }

  signup(): void {
    this.router.navigate(['/signup']);
  }

    toggleTheme(): void {
    this.themeService.toggleTheme();
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
