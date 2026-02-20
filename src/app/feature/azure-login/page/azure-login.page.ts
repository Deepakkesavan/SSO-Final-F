import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { LogoComponent } from '../components/logo/logo.component';

@Component({
  selector: 'app-azure-login',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  templateUrl: './azure-login.page.html',
  styleUrls: ['./azure-login.page.scss'],
})
export class AzureLoginComponent {
  private readonly authService = inject(AuthServiceService);

  loginWithAzure(): void {
    this.authService.loginWithAzure();
  }
}
