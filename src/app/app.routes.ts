import { Routes } from '@angular/router';
import { DashboardPage } from './feature/dashboard/page/dashboard.page';
import { AppLoginComponent } from './feature/app-login-module/page/app-login.page';
import { SignupComponent } from './feature/public/components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './feature/public/components/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './feature/public/components/verify-otp/verify-otp.component';
import { SetNewPasswordComponent } from './feature/public/components/set-new-password/set-new-password.component';
import { AzureLoginComponent } from './feature/azure-login/page/azure-login.page';
import { LoginUserComponent } from './feature/public/components/login-user/login-user.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { ReactWrapperComponent } from './react-wrapper/react-wrapper.component';
import { EmpWrapperComponent } from './emp-wrapper/emp-wrapper.component';
import { environment } from '../environments/environment';
import { Children } from 'react';

export const routes: Routes = [
  {
    path: 'ssoui',
    children: [
      { path: '', redirectTo: 'azure-login', pathMatch: 'full' },
      { path: 'login', component: AppLoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'verify-otp', component: VerifyOtpComponent },
      { path: 'set-new-password', component: SetNewPasswordComponent },
      { path: 'azure-login', component: AzureLoginComponent },
      { path: 'user-login', component: LoginUserComponent },

      {
        path: 'dashboard',
        component: DashboardPage,
        children: [
          { path: '', redirectTo: 'ems', pathMatch: 'full' },
          {
            path: 'lms',
            loadChildren: () =>
              loadRemoteModule({
                type: 'module',
                remoteEntry: environment.remotes.lms,
                exposedModule: './Routes',
              }).then((m) => m.routes),
          },
          // {
          //   path: 'rrf',
          //   loadChildren: () => {
          //     console.log('[Federation] Loading remote module: RRF');
          //     console.log(
          //       '[Federation] Remote entry URL:',
          //       environment.remotes.rrf
          //     );

          //     return loadRemoteModule({
          //       type: 'module',
          //       remoteEntry: environment.remotes.rrf,
          //       exposedModule: './Routes',
          //     })
          //       .then((m) => {
          //         console.log('[Federation] Remote module loaded successfully:', m);
          //         return m.routes;
          //       })
          //       .catch((err) => {
          //         console.error('[Federation] Failed to load remote module:', err);
          //         throw err;
          //       });
          //   },
          // },

          { path: 'tms', component: ReactWrapperComponent },
          { path: 'ems', component: EmpWrapperComponent },
        ],
      },
    ],
  },

  // Wildcard (optional)
  { path: '**', redirectTo: 'azure-login' },
];
