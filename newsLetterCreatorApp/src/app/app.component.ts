import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { filter } from 'rxjs';


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

  constructor(private router: Router) {
    // Listen to NavigationEnd events to check the current route
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // If the URL is /homePage, hide the sidebar
        if (event.url === '/homePage') {
          this.hideSidebar = true;
        } else {
          this.hideSidebar = false;
        }
      });
  }


  ngOnInit() {}

  onToggleSidebar(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }
}
