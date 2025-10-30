import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from "../components/login-form/login-form.component";
import { LayoutComponent } from "../../../shared/components/layout/layout.component";
import { APP_LOGIN_BRANDING_DETAILS } from '../../../core/constants/constant';

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

  // Get the current user state from the signal
  user = this.authService.userSubjectOneSignal();
  
  // Branding data
  brandingData = APP_LOGIN_BRANDING_DETAILS;

  constructor() {
    // Check if user is already authenticated
    if (this.user.authenticated) {
      this.router.navigate(['/dashboard']);
    }
  }
}