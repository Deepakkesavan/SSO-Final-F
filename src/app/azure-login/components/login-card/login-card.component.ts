import { Component } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-card',
  imports: [],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss'
})
export class LoginCardComponent {
  loading = false;

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  loginWithAzure(): void {
    this.loading = true;
    this.authService.loginWithAzure();
  }

  goToUserLogin(): void {
    this.router.navigate(['/user-login']);
  }
}
