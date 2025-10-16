import { Component } from '@angular/core';
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
  
}