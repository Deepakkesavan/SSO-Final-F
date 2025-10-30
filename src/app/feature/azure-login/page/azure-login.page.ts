import { Component, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { LoginCardComponent } from '../components/login-card/login-card.component';

@Component({
  selector: 'app-azure-login',
  standalone: true,
  imports: [CommonModule, LoginCardComponent],
  templateUrl: './azure-login.page.html',
  styleUrls: ['./azure-login.page.scss']
})
export class AzureLoginComponent {
  private authService = inject(AuthServiceService);
  private router = inject(Router);

  constructor() {
    // React to authentication state changes
    effect(() => {
      const userState = this.authService.userSubjectOneSignal();
      
      console.log('AzureLoginComponent - Auth State:', {
        authenticated: userState.authenticated,
        hasUser: !!userState.user,
        user: userState.user
      });

      // If already authenticated with user profile, redirect to dashboard
      if (userState.authenticated && userState.user) {
        console.log('User already authenticated, redirecting to dashboard...');
        this.router.navigate(['/dashboard']);
      }
    });

    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const hasOAuthCode = urlParams.has('code');
    const hasOAuthState = urlParams.has('state');
    
    if (hasOAuthCode || hasOAuthState) {
      console.log('OAuth callback detected in AzureLogin component');
      console.log('OAuth params:', {
        code: urlParams.get('code')?.substring(0, 20) + '...',
        state: urlParams.get('state')
      });

      // Give backend time to process OAuth, then fetch profile
      setTimeout(() => {
        console.log('Fetching user profile after OAuth callback...');
        this.authService.getUserProfile().subscribe({
          next: (user) => {
            console.log('Profile fetched successfully:', user);
            // The effect above will handle the redirect
          },
          error: (err) => {
            console.error('Failed to fetch profile after OAuth:', err);
            // Clear URL params and stay on login
            this.router.navigate(['/azure-login'], { replaceUrl: true });
          }
        });
      }, 500);
    }
  }
}