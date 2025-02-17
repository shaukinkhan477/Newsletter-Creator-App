import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonEngine } from '@angular/ssr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<boolean>();
  isCollapsed = false; // Sidebar is expanded by default
  loading = true;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // Simulate a delay
    setTimeout(() => {
      this.loading = false;
    }, 1000); // Adjust the delay as needed
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleSidebar.emit(this.isCollapsed);
  }
}
