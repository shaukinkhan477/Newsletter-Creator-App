import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  errorMsg = '';
  successMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.name || !this.email || !this.password) {
      this.errorMsg = 'All fields are required.';
      return;
    }

    this.authService
      .signup({ name: this.name, email: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
          if (res.token) {
            // If your backend returns a token upon signup
            this.authService.setToken(res.token);
          }

          // Show success message
          this.successMsg = 'Successfully signed up! Redirecting to login...';
          this.errorMsg = ''; // Clear any previous error messages

          // Redirect to login after 3 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          this.errorMsg = err.error?.message || 'Signup failed.';
          this.successMsg = ''; // Clear any previous success messages
        },
      });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
