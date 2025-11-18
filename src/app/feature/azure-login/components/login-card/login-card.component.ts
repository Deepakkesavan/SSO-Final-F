import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../../../shared/services/auth-service.service';
import { Router } from '@angular/router';
import { AZURE_LOGIN_DETAILS } from '../../../../core/constants/constant';
import { AzureButtonComponent } from '../../../../shared/components/azure-button/azure-button.component';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [AzureButtonComponent],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss',
})
export class LoginCardComponent {
  text = AZURE_LOGIN_DETAILS;
  loading = false;

  authService = inject(AuthServiceService);
  router = inject(Router);

  loginWithAzure(): void {
    this.loading = true;
    this.authService.loginWithAzure();
  }

  goToUserLogin(): void {
    this.router.navigate(['/user-login']);
  }
}
