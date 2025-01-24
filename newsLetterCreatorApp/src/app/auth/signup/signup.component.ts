import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  errorMsg = '';
  successMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

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
            this.authService.setToken(res.token);
            if (res.user) {
              this.authService.setUserInfo({
                id: res.user.id,
                email: res.user.email,
                name: res.user.name,
              });
            }
            // Show success message
            this.successMsg = 'Successfully signed up! Redirecting to login...';
            this.errorMsg = ''; // Clear any previous error messages

            // Redirect to login after 3 seconds
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          }
        },
        error: (err) => {
          this.errorMsg = err.error?.message || 'Signup failed.';
        },
      });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
