import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ForgotPasswordResponse {
  message: string;
  email: string;
}

interface VerifyOtpResponse {
  message: string;
  email: string;
}

interface SetPasswordResponse {
  message: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private readonly API_URL = 'http://localhost:8080/custom-login/auth';
  private email: string = '';

  constructor(private http: HttpClient) {}

  // Send password reset OTP
  sendPasswordResetOtp(email: string): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      `${this.API_URL}/forgot-password`,
      { email },
      { withCredentials: true }
    );
  }

  // Verify OTP
  verifyOtp(otp: string): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(
      `${this.API_URL}/verify-reset-otp`,
      { otp },
      { withCredentials: true }
    );
  }

  // Set new password
  setNewPassword(newPassword: string): Observable<SetPasswordResponse> {
    return this.http.post<SetPasswordResponse>(
      `${this.API_URL}/set-new-password`,
      { newPassword },
      { withCredentials: true }
    );
  }

  // Store email temporarily (in-memory only for navigation between components)
  setEmail(email: string): void {
    this.email = email;
  }

  // Get stored email
  getEmail(): string {
    return this.email;
  }

  // Clear email after successful password reset
  clearEmail(): void {
    this.email = '';
  }
}