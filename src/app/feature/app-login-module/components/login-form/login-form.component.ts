import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { AuthServiceService } from '../../../../shared/services/auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LOGIN_PAGE_DETAILS } from '../../../../core/constants/constant';
import { AzureButtonComponent } from "../../../../shared/components/azure-button/azure-button.component";

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, AzureButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit, OnDestroy{
  text = LOGIN_PAGE_DETAILS
  errorMessage = '';
  loading = true;
  customLoginLoading = false;
  isAuthenticated = false;
  loginForm!: FormGroup;

  private destroy$ = new Subject<void>();

  private authService = inject(AuthServiceService);
  private router = inject(Router);
  private fb = inject(FormBuilder)

  ngOnInit(): void {
    this.initializeForm();
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.loading = false;
      this.isAuthenticated = user.authenticated;

      if (this.isAuthenticated && !user.user) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
  }


  customLogin(): void {   
     
    if (!this.loginForm.get('email')?.value || !this.loginForm.get('password')?.value) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.customLoginLoading = true;
    this.errorMessage = '';

    this.authService
      .customLogin(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.authService.getUserProfile()) // fetch full user profile after login
      )
      .subscribe({
        next: () => {
          this.customLoginLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.customLoginLoading = false;
          this.errorMessage =
            err.status === 404
              ? 'User not found'
              : err.status === 401
              ? 'Invalid credentials'
              : 'Login failed';
        },
      });
  }

  loginWithAzure(): void {
    this.authService.loginWithAzure();
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
