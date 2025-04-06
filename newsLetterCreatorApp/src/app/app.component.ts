import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { filter } from 'rxjs';
import { ThemeService } from './services/theme.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    SidebarComponent,
    HeaderComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'newsLetterCreatorApp';
  hideSidebar = false;
  isSidebarCollapsed = false;
  isDarkMode = false;

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {

        // Subscribe to theme changes
    this.themeService.darkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
    
    // Listen for navigation changes
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ) // Ensure event is NavigationEnd
      )
      .subscribe((event: NavigationEnd) => {
  const currentUrl = event.urlAfterRedirects;
  // Define routes where the sidebar should be hidden
  const hideSidebarRoutes = ['/homePage', '/login', '/signup', '/forgot-password', 'reset-password/'];
  
  // Hide sidebar if currentUrl starts with any of the specified routes
  this.hideSidebar = hideSidebarRoutes.some(route => currentUrl.startsWith(route));
});
  }

  onToggleSidebar(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }
}
