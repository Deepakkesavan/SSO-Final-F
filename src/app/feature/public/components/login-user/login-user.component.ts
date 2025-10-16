import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../../shared/services/auth-service.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AzureButtonComponent } from "../../../../shared/components/azure-button/azure-button.component";
import { LayoutComponent } from "../../../../shared/components/layout/layout.component";
import { USER_LOGIN_PAGE_DETAILS } from '../../../../core/constants/constant';

@Component({
  selector: 'app-login-user',
  imports: [ReactiveFormsModule, AzureButtonComponent, LayoutComponent],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.scss',
  
})
export class LoginUserComponent implements OnInit, OnDestroy{
  brandinDetails = USER_LOGIN_PAGE_DETAILS
  loginForm!:FormGroup;
  loading = false;
  errorMessage = "";
  private fb = inject(FormBuilder);
  authService = inject(AuthServiceService);
  private destroy$ = new Subject<void>();
  private router = inject(Router);

  ngOnInit(): void {
      this.initializeForm();
  }


  initializeForm(){
    this.loginForm = this.fb.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  login(): void {
    if (!this.loginForm.get('username')?.value || !this.loginForm.get("password")?.value) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService
      .customLogin(this.loginForm.get("username")?.value, this.loginForm.get('password')?.value)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.authService.getUserProfile())
      )
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.status === 401 
            ? 'Invalid credentials' 
            : 'Login failed. Please try again.';
        }
      });
  }

  navigateToForgotPassword(){
    this.router.navigate(['forgot-password'],{replaceUrl: true});
  }

  navigateToSignup(){
    this.router.navigate(['signup'], {replaceUrl: true})
  }

  goToAzureLogin(): void {
    this.router.navigate(['/azure-login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
