import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { filter } from 'rxjs';
import { HomeComponent } from "./components/home/home.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    HomeComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'newsLetterCreatorApp';

  hideSidebar = false;

  isSidebarCollapsed = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen for navigation changes
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ) // Ensure event is NavigationEnd
      )
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects; // Get final redirected URL

        // Hide sidebar for homePage route
        this.hideSidebar = currentUrl.startsWith('/homePage');
      });
  }

  onToggleSidebar(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }
}
