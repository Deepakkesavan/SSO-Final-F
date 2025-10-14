import { Routes } from '@angular/router';
import { DashboardPage } from './dashboard/page/dashboard.page';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { SignupComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { SetNewPasswordComponent } from './components/set-new-password/set-new-password.component';
import { authGuard } from './guards/auth.guard';
import { AzureLoginComponent } from './azure-login/page/azure-login.page';
import { UserLoginComponent } from './components/user-login/user-login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/azure-login', pathMatch: 'full' },
  { path: 'login', component: AppLoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-otp', component: VerifyOtpComponent },
  { path: 'set-new-password', component: SetNewPasswordComponent },
  { path: 'azure-login', component: AzureLoginComponent },
  { path: 'user-login', component: UserLoginComponent },
  {
    path: 'dashboard',
    component: DashboardPage,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/azure-login' },
];