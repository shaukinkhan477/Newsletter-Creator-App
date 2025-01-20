import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonEngine } from '@angular/ssr';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() toggleSidebar = new EventEmitter<boolean>();
  isCollapsed = false; // Sidebar is expanded by default

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleSidebar.emit(this.isCollapsed);
  }
}
