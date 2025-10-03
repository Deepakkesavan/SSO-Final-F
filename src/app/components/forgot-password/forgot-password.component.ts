import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  imports: [FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForgotPasswordComponent {
  email = '';
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private forgotPasswordService: ForgotPasswordService
  ) {}

  onSubmit(): void {
    if (!this.email) {
      this.errorMessage = 'Please enter your email address';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.forgotPasswordService.sendPasswordResetOtp(this.email).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = response.message || 'OTP sent to your email!';
        
        // Store email in service for next steps
        this.forgotPasswordService.setEmail(this.email);
        
        // Navigate to verify OTP page after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/verify-otp']);
        }, 2000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.error?.error || 'Failed to send OTP. Please try again.';
        console.error('Error sending OTP:', error);
      }
    });
  }

  goBackToLogin(): void {
    this.router.navigate(['/login']);
  }
}