import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../../../shared/services/auth-service.service';
import { Router } from '@angular/router';
import { IUser } from '../../model/dashboard.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private authService = inject(AuthServiceService);
  private router = inject(Router);

  user = this.authService.userSubjectOneSignal();
  logoutLoading = false;

  constructor() {
    if (!this.user.authenticated) {
      this.router.navigate(['/azure-login']);
    }
  }

  getWelcomeMessage(): string {
    return this.user.user?.givenName ? `Welcome, ${this.user.user.givenName}!` : 'Welcome!';
  }

  logout(): void {
    this.logoutLoading = true;
    this.authService.logout().toPromise().then(() => {
      this.logoutLoading = false;
      this.router.navigate(['/azure-login']);
    }, () => {
      this.logoutLoading = false;
    });
  }
}