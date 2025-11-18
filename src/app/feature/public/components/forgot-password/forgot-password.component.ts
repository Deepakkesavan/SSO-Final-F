import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForgotPasswordService } from '../../../../shared/services/forgot-password.service';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { FORGOT_PASSWORD_PAGE_DETAILS } from '../../../../core/constants/constant';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LayoutComponent],
})
export class ForgotPasswordComponent implements OnInit {
  brandingDetails = FORGOT_PASSWORD_PAGE_DETAILS;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  forgotPasswordForm!: FormGroup;

  private router = inject(Router);
  private forgotPasswordService = inject(ForgotPasswordService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const email = this.forgotPasswordForm.get('email')?.value;

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.forgotPasswordService.sendPasswordResetOtp(email).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = response.message || 'OTP sent to your email!';

        // Store email in service for next steps
        this.forgotPasswordService.setEmail(email);

        // Navigate to verify OTP page after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/verify-otp']);
        }, 2000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage =
          error.error?.error || 'Failed to send OTP. Please try again.';
        console.error('Error sending OTP:', error);
      },
    });
  }

  goBackToLogin(): void {
    this.router.navigate(['user-login'], { replaceUrl: true });
  }
}
