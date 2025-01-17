import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
  if (!this.email || !this.password) {
    this.errorMsg = 'All fields are required.';
    return;
  }
  this.authService.login({ email: this.email, password: this.password })
    .subscribe({
      next: (res: any) => {
        if (res.token) {
          // 1) Store token
          this.authService.setToken(res.token);
          // 2) Store user info
          if (res.user) {
            this.authService.setUserInfo({
              id: res.user.id,
              email: res.user.email,
              name: res.user.name
            });
          }
          // 3) Navigate to home or wherever
          this.router.navigate(['/home']);
        } else {
          this.errorMsg = 'Invalid login response (no token).';
        }
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Login failed.';
      }
    });
}

  // Navigate to Forgot Password
  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
