import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
  imports: [FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VerifyOtpComponent implements OnInit {
  otp = '';
  email = '';
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  isResending = false;

  constructor(
    private router: Router,
    private forgotPasswordService: ForgotPasswordService
  ) {}

  ngOnInit(): void {
    // Get email from service
    this.email = this.forgotPasswordService.getEmail();
    
    // If no email found, redirect back to forgot password
    if (!this.email) {
      this.router.navigate(['/forgot-password']);
    }
  }

  onSubmit(): void {
    if (!this.otp || this.otp.length !== 6) {
      this.errorMessage = 'Please enter a valid 6-digit OTP';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.forgotPasswordService.verifyOtp(this.otp).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = response.message || 'OTP verified successfully!';
        
        // Navigate to set new password page after 1.5 seconds
        setTimeout(() => {
          this.router.navigate(['/set-new-password']);
        }, 1500);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.error?.error || 'Invalid or expired OTP. Please try again.';
        console.error('Error verifying OTP:', error);
      }
    });
  }

  resendOtp(): void {
    this.isResending = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.forgotPasswordService.sendPasswordResetOtp(this.email).subscribe({
      next: (response) => {
        this.isResending = false;
        this.successMessage = 'New OTP sent to your email!';
        this.otp = ''; // Clear previous OTP
      },
      error: (error) => {
        this.isResending = false;
        this.errorMessage = error.error?.error || 'Failed to resend OTP. Please try again.';
        console.error('Error resending OTP:', error);
      }
    });
  }

  goBackToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  // Auto-format OTP input (optional enhancement)
  onOtpInput(event: any): void {
    const value = event.target.value.replace(/\D/g, ''); // Remove non-digits
    this.otp = value.substring(0, 6); // Limit to 6 digits
  }
}