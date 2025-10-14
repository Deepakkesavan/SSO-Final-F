import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from '../../model/dashboard.model';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{

  user!: IUser;
  logoutLoading = false;
  private destroy$ = new Subject<void>();
  authService = inject(AuthServiceService);
  router = inject(Router);

  ngOnInit(): void {
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (!user.authenticated) this.router.navigate(['/azure-login']);
      else this.user = user.user ?? {};      
    });
  }

  getWelcomeMessage(): string {
    return this.user?.givenName
      ? `Welcome, ${this.user.givenName}!`
      : 'Welcome!';
  }

  logout(): void {
    this.logoutLoading = true;
    this.authService.logout().subscribe(() => this.router.navigate(['/azure-login']));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
