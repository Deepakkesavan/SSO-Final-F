import { Component, inject, NgZone, effect } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { LoginCardComponent } from '../components/login-card/login-card.component';

@Component({
  selector: 'app-azure-login',
  standalone: true,
  imports: [CommonModule, LoginCardComponent],
  templateUrl: './azure-login.page.html',
  styleUrls: ['./azure-login.page.scss'],
})
export class AzureLoginComponent {
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  private zone = inject(NgZone);

  constructor() {
    // 🧩 React to auth state changes
    effect(() => {
      const userState = this.authService.userSubjectOneSignal();

      console.log('AzureLoginComponent - Auth State:', {
        authenticated: userState.authenticated,
        hasUser: !!userState.user,
        user: userState.user,
      });

      if (userState.authenticated && userState.user) {
        console.log('✅ User authenticated, navigating to dashboard...');

        try {
          const routes = this.router?.config?.map((r) => r.path);
          console.log('Available routes:', routes);
        } catch (err) {
          console.error('❌ Failed to read router config:', err);
        }

        this.zone.run(() => {
          this.router.navigateByUrl('/dashboard').then((success) => {
            console.log(
              success ? '🎯 Navigation successful!' : '⚠️ Navigation failed!'
            );
          });
        });
      }
    });

    // 🔐 Handle OAuth callback params
    const urlParams = new URLSearchParams(window.location.search);
    const hasOAuthCode = urlParams.has('code');
    const hasOAuthState = urlParams.has('state');

    if (hasOAuthCode || hasOAuthState) {
      console.log('🔑 OAuth callback detected in AzureLogin component');
      console.log('OAuth params:', {
        code: urlParams.get('code')?.substring(0, 20) + '...',
        state: urlParams.get('state'),
      });

      // Wait a moment to ensure backend updates session
      setTimeout(() => {
        console.log('Fetching user profile after OAuth callback...');
        this.authService.getUserProfile().subscribe({
          next: (user) => {
            console.log('Profile fetched successfully:', user);
            // Navigation handled in effect above
          },
          error: (err) => {
            console.error('❌ Failed to fetch profile after OAuth:', err);
            this.zone.run(() => {
              this.router.navigateByUrl('/ssoui/azure-login');
            });
          },
        });
      }, 500);
    }
  }
}
