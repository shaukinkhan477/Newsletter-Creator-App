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
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
          if (res.token) {
            // Store token & redirect
            this.authService.setToken(res.token);
            this.router.navigate(['/home']);
          } else {
            this.errorMsg = 'Invalid login response.';
          }
        },
        error: (err) => {
          // Handle errors
          this.errorMsg = err.error?.message || 'Login failed.';
        },
      });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
