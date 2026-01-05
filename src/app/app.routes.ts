import { Routes } from '@angular/router';
import { AppLoginComponent } from './feature/app-login-module/page/app-login.page';
import { SignupComponent } from './feature/public/components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './feature/public/components/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './feature/public/components/verify-otp/verify-otp.component';
import { SetNewPasswordComponent } from './feature/public/components/set-new-password/set-new-password.component';
import { AzureLoginComponent } from './feature/azure-login/page/azure-login.page';
import { LoginUserComponent } from './feature/public/components/login-user/login-user.component';

export const routes: Routes = [
  { path: 'login', component: AppLoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-otp', component: VerifyOtpComponent },
  { path: 'set-new-password', component: SetNewPasswordComponent },
  { path: '', component: AzureLoginComponent },
  { path: 'user-login', component: LoginUserComponent },
];
