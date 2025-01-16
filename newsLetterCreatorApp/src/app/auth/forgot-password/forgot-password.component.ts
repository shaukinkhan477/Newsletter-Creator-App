import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email = '';
  errorMsg = '';
  successMsg = '';

  // Adjust to your actual backend URL
  private apiUrl = 'http://localhost:3000/api/auth/forgot-password';

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    if (!this.email) {
      this.errorMsg = 'Email is required.';
      return;
    }

    // Clear any previous messages
    this.errorMsg = '';
    this.successMsg = '';

    // Make the POST request to backend
    this.http.post(this.apiUrl, { email: this.email }).subscribe({
      next: (response: any) => {
        this.successMsg = 'If that email exists, a reset link has been sent!';
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Error sending reset email.';
      },
    });
  }
}
