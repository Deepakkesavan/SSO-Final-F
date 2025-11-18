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
  private userState = this.authService.userSubjectOneSignal();

  constructor() {
    effect(() => {
      if (
        this.userState?.authenticated &&
        this.userState.user &&
        this.router.url !== '/ems'
      ) {
        this.zone.run(() => this.router.navigateByUrl('/ems'));
      }
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('code') || urlParams.has('state')) {
      setTimeout(() => {
        this.authService.getUserProfile().subscribe({
          next: (user) => console.log('Profile fetched successfully:', user),
          error: (err) => {
            this.zone.run(() => this.router.navigateByUrl('/azure-login'));
          },
        });
      }, 500);
    }
  }
}
