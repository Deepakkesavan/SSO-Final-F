import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router) {}

  onSubmit(): void {
    if (!this.email) {
      this.errorMessage = 'Please enter your email address';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Simulate API call - replace with actual service call
    setTimeout(() => {
      this.isSubmitting = false;
      this.successMessage = 'Password reset link has been sent to your email!';
      
      // Optionally redirect back to login after a delay
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    }, 1500);
  }

  goBackToLogin(): void {
    this.router.navigate(['/login']);
  }
}