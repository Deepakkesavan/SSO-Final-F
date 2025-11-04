import { Component, inject, input, computed } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-azure-button',
  imports: [],
  standalone: true,
  templateUrl: './azure-button.component.html',
  styleUrl: './azure-button.component.scss',
})
export class AzureButtonComponent {
  authService = inject(AuthServiceService);
  data = input<string>('Login with Azure AD');

  text = computed(() => this.data());

  loginWithAzure(): void {
    this.authService.loginWithAzure();
  }
}
