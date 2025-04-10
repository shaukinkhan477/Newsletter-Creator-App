import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userName = '';
  userEmail = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  ngOnInit() {
    // Check if the code is running in the browser
    if (isPlatformBrowser(this.platformId)) {
      const user = this.authService.getUserInfo();
      if (user) {
        this.userName = user.name;
        this.userEmail = user.email;
      } else {
        // If there is no user info, possibly redirect or handle accordingly
        this.router.navigate(['/login']);
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
