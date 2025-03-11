import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMsg = '';
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Simulate a delay
    setTimeout(() => {
      this.loading = false;
    }, 1000); // Adjust the delay as needed
  }

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
            // 1) Store token
            this.authService.setToken(res.token);
            // 2) Store user info
            if (res.user) {
              this.authService.setUserInfo({
                id: res.user.id,
                email: res.user.email,
                name: res.user.name,
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
        },
      });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  // Navigate to Forgot Password
  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
