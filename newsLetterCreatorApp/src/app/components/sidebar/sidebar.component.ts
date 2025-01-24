import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonEngine } from '@angular/ssr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() toggleSidebar = new EventEmitter<boolean>();
  isCollapsed = false; // Sidebar is expanded by default

  constructor(private translate: TranslateService) {}

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleSidebar.emit(this.isCollapsed);
  }
}
