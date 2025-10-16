import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../../shared/services/auth-service.service';
import { Router } from '@angular/router';
import { LayoutComponent } from "../../../../shared/components/layout/layout.component";
import { SIGNUP_PAGE_DETAILS } from '../../../../core/constants/constant';

interface SignupData {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, LayoutComponent, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'], // fixed here
})
export class SignupComponent implements OnInit{
  brandingDetails = SIGNUP_PAGE_DETAILS;
  errorMessage = '';
  successMessage = '';
  loading = false;
  signupForm!:FormGroup;

  authService = inject(AuthServiceService);
  router = inject(Router);
  fb = inject(FormBuilder);

  ngOnInit(): void {
      this.initializeForm();
  }

  initializeForm(){
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  signup(): void {
    
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // this.authService.signup(this.signupData).subscribe({
    //   next: (response) => {
    //     this.loading = false;
    //     console.log('Signup successful:', response);
    //     this.successMessage = 'Account created successfully! Redirecting to login...';

    //     // Redirect to login after 2 seconds
    //     setTimeout(() => this.router.navigate(['/login']), 2000);
    //   },
    //   error: (error: { error?: { error: string }; status: number }) => {
    //     this.loading = false;
    //     console.error('Signup failed:', error);

    //     if (error.error?.error) {
    //       this.errorMessage = error.error.error;
    //     } else if (error.status === 400) {
    //       this.errorMessage =
    //         'Email or username already exists. Please try with different credentials.';
    //     } else {
    //       this.errorMessage = 'Signup failed. Please try again.';
    //     }
    //   },
    // });
   
  }
  navigateToLogin(){
    this.router.navigate(['user-login'],{ replaceUrl: true})
  }

}
