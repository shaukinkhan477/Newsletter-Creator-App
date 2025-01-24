import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';


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

  isSidebarCollapsed = false;

  constructor() {}

  ngOnInit() {}

  onToggleSidebar(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }
}
