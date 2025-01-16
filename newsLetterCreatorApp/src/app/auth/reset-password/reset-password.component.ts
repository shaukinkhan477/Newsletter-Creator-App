import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  token: string | null = null;
  newPassword = '';
  confirmPassword = '';
  errorMsg = '';
  successMsg = '';

  // Adjust your backend URL as needed
  private apiUrl = 'http://localhost:3000/api/auth/reset-password';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Grab the :token from the URL route
    this.token = this.route.snapshot.paramMap.get('token');
  }

  onSubmit(): void {
    // Basic validation
    if (!this.newPassword || !this.confirmPassword) {
      this.errorMsg = 'Both fields are required.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.errorMsg = 'Passwords do not match.';
      return;
    }
    if (!this.token) {
      this.errorMsg = 'No reset token found in URL.';
      return;
    }

    // Clear any existing messages
    this.errorMsg = '';
    this.successMsg = '';

    // Send the reset request
    this.http
      .post(this.apiUrl, {
        resetToken: this.token,
        newPassword: this.newPassword,
      })
      .subscribe({
        next: (response: any) => {
          // Handle success
          this.successMsg = 'Password reset successful! You can now log in.';
          // Optionally redirect after a moment
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          // Handle error
          this.errorMsg = err.error?.message || 'Error resetting password.';
        },
      });
  }
}
