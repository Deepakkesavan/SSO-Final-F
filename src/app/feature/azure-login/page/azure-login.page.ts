import { Component, inject, NgZone, effect } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  private readonly authService = inject(AuthServiceService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.authService.checkAuthenticationStatus().subscribe({
      next: (value) => {
        if (value.authenticated) {
          this.router.navigate(['/overview']);
        }
      },
    });
  }
}
