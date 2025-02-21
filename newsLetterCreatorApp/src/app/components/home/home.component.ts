import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onGetStarted() {
    if (!this.authService.isLoggedIn()) {
      // Not logged in => go to login
      this.router.navigate(['/login']);
    } else {
      // Already logged in => go to editor
      this.router.navigate(['/home']);
    }
  }

}
