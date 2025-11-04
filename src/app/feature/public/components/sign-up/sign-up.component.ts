import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../../shared/services/auth-service.service';
import { Router } from '@angular/router';
import { LayoutComponent } from "../../../../shared/components/layout/layout.component";
import { SIGNUP_PAGE_DETAILS } from '../../../../core/constants/constant';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, LayoutComponent, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignupComponent implements OnInit {
  brandingDetails = SIGNUP_PAGE_DETAILS;
  errorMessage = '';
  successMessage = '';
  loading = false;
  signupForm!: FormGroup;

  private http = inject(HttpClient);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signup(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const signupData = {
      username: this.signupForm.get('username')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value
    };

    this.http.post('https://people-dev.clarium.tech/ssoapi/custom-login/auth/signup', signupData, {
      withCredentials: true
    }).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Signup successful:', response);
        this.successMessage = 'Account created successfully! Redirecting to login...';

        // Redirect to login after 2 seconds
        setTimeout(() => this.router.navigate(['/user-login']), 2000);
      },
      error: (error: { error?: { error: string }; status: number }) => {
        this.loading = false;
        console.error('Signup failed:', error);

        if (error.error?.error) {
          this.errorMessage = error.error.error;
        } else if (error.status === 400) {
          this.errorMessage = 'Email or username already exists. Please try with different credentials.';
        } else {
          this.errorMessage = 'Signup failed. Please try again.';
        }
      },
    });
  }

  navigateToLogin() {
    this.router.navigate(['user-login'], { replaceUrl: true });
  }
}