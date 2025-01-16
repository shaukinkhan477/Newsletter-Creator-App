import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // If your AuthService stores user info somewhere, retrieve it
    // For example:
    const currentUser = this.authService.getUserInfo();
    if (currentUser) {
      this.userName = currentUser.name;
      this.userEmail = currentUser.email;
    } else {
      // If no user is logged in, redirect to login
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
