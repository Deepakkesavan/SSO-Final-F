import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css'],
  imports: [FormsModule, CommonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SetNewPasswordComponent implements OnInit {
  newPassword = '';
  confirmPassword = '';
  email = '';
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

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
    // Validate passwords
    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Please enter both password fields';
      return;
    }

    if (this.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.forgotPasswordService.setNewPassword(this.newPassword).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = response.message || 'Password reset successfully!';
        
        // Clear the email from service
        this.forgotPasswordService.clearEmail();
        
        // Navigate to login page after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.error?.error || 'Failed to reset password. Please try again.';
        console.error('Error setting new password:', error);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  checkPasswordStrength(): string {
    if (!this.newPassword) return '';
    
    const length = this.newPassword.length;
    const hasUpperCase = /[A-Z]/.test(this.newPassword);
    const hasLowerCase = /[a-z]/.test(this.newPassword);
    const hasNumbers = /\d/.test(this.newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword);
    
    let strength = 0;
    if (length >= 6) strength++;
    if (length >= 8) strength++;
    if (hasUpperCase && hasLowerCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChar) strength++;
    
    if (strength <= 2) return 'weak';
    if (strength <= 3) return 'medium';
    return 'strong';
  }

  getPasswordStrengthClass(): string {
    const strength = this.checkPasswordStrength();
    return strength ? `password-strength-${strength}` : '';
  }

  getPasswordStrengthText(): string {
    const strength = this.checkPasswordStrength();
    if (strength === 'weak') return 'Weak';
    if (strength === 'medium') return 'Medium';
    if (strength === 'strong') return 'Strong';
    return '';
  }

  // Helper methods for template
  hasMinLength(): boolean {
    return this.newPassword.length >= 6;
  }

  hasUpperAndLowerCase(): boolean {
    return /[A-Z]/.test(this.newPassword) && /[a-z]/.test(this.newPassword);
  }

  hasNumber(): boolean {
    return /\d/.test(this.newPassword);
  }

  getRequirementIcon(met: boolean): string {
    return met ? 'checkmark-circle' : 'ellipse-outline';
  }
}