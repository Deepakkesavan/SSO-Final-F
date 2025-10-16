import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from "../components/login-form/login-form.component";
import { LayoutComponent } from "../../../shared/components/layout/layout.component";

@Component({
  selector: 'app-login',
  templateUrl: './app-login.page.html',
  styleUrls: ['./app-login.page.scss'],
  imports: [FormsModule, CommonModule, LoginFormComponent, LayoutComponent],
  standalone: true
})
export class AppLoginComponent {
  private authService = inject(AuthServiceService);
  private router = inject(Router);

  loginData = { username: '', password: '' };
  errorMessage = '';
  loading = true;
  customLoginLoading = false;
  user = this.authService.userSubjectOneSignal();
  // Placeholder for brandingData; adjust type as needed
  brandingData: any = {};

  constructor() {
    this.loading = false;
    if (this.user.authenticated && this.user.user) {
      this.router.navigate(['/dashboard']);
    }
  }

  customLogin(): void {
    if (!this.loginData.username || !this.loginData.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.customLoginLoading = true;
    this.errorMessage = '';

    this.authService.customLogin(this.loginData.username, this.loginData.password)
      .toPromise()
      .then(() => this.authService.getUserProfile().toPromise())
      .then(() => {
        this.customLoginLoading = false;
        this.router.navigate(['/dashboard']);
      }, (err) => {
        this.customLoginLoading = false;
        this.errorMessage = 'Login failed. Please check your credentials.';
      });
  }

  loginWithAzure(): void {
    this.authService.loginWithAzure();
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}