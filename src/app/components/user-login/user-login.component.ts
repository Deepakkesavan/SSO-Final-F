import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  // View states
  currentView: 'login' | 'signup' | 'forgot-password' | 'verify-otp' | 'reset-password' = 'login';
  
  // Login data
  loginData = { username: '', password: '' };
  
  // Signup data
  signupData = { username: '', email: '', password: '' };
  
  // Forgot password data
  forgotPasswordEmail = '';
  
  // OTP verification
  otpCode = '';
  
  // Reset password
  newPassword = '';
  confirmPassword = '';
  
  // Status flags
  errorMessage = '';
  successMessage = '';
  loading = false;
  isAuthenticated = false;

  private destroy$ = new Subject<void>();
  private readonly CUSTOM_API = 'http://localhost:8080/custom-login/auth';

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.isAuthenticated = user.authenticated;
      if (this.isAuthenticated) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  // ==================== LOGIN ====================
  login(): void {
    if (!this.loginData.username || !this.loginData.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService
      .customLogin(this.loginData.username, this.loginData.password)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.authService.getUserProfile())
      )
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.status === 401 
            ? 'Invalid credentials' 
            : 'Login failed. Please try again.';
        }
      });
  }

  // ==================== SIGNUP ====================
  signup(): void {
    if (!this.signupData.username || !this.signupData.email || !this.signupData.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post(`${this.CUSTOM_API}/signup`, this.signupData, { withCredentials: true })
      .subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Account created successfully!';
          setTimeout(() => {
            this.switchView('login');
            this.successMessage = '';
          }, 2000);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.error || 'Signup failed. Please try again.';
        }
      });
  }

  // ==================== FORGOT PASSWORD ====================
  sendPasswordResetOtp(): void {
    if (!this.forgotPasswordEmail) {
      this.errorMessage = 'Please enter your email';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post(`${this.CUSTOM_API}/forgot-password`, 
      { email: this.forgotPasswordEmail }, 
      { withCredentials: true })
      .subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'OTP sent to your email';
          this.switchView('verify-otp');
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.error || 'Failed to send OTP. Please try again.';
        }
      });
  }

  // ==================== VERIFY OTP ====================
  verifyOtp(): void {
    if (!this.otpCode) {
      this.errorMessage = 'Please enter the OTP';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post(`${this.CUSTOM_API}/verify-reset-otp`, 
      { otp: this.otpCode }, 
      { withCredentials: true })
      .subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'OTP verified successfully';
          this.switchView('reset-password');
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.error || 'Invalid or expired OTP';
        }
      });
  }

  // ==================== RESET PASSWORD ====================
  resetPassword(): void {
    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post(`${this.CUSTOM_API}/set-new-password`, 
      { newPassword: this.newPassword }, 
      { withCredentials: true })
      .subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Password reset successful!';
          setTimeout(() => {
            this.switchView('login');
            this.resetAllForms();
          }, 2000);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.error || 'Failed to reset password';
        }
      });
  }

  // ==================== VIEW SWITCHING ====================
  switchView(view: 'login' | 'signup' | 'forgot-password' | 'verify-otp' | 'reset-password'): void {
    this.currentView = view;
    this.errorMessage = '';
    this.successMessage = '';
  }

  resetAllForms(): void {
    this.loginData = { username: '', password: '' };
    this.signupData = { username: '', email: '', password: '' };
    this.forgotPasswordEmail = '';
    this.otpCode = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  goToAzureLogin(): void {
    this.router.navigate(['/azure-login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}