import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-azure-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './azure-login.component.html',
  styleUrls: ['./azure-login.component.css']
})
export class AzureLoginComponent {
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