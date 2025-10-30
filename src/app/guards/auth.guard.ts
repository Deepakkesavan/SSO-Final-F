import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../shared/services/auth-service.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated();
  
  console.log('Auth Guard Check:', {
    isAuthenticated: isAuth,
    user: authService.userSubjectOneSignal().user
  });

  if (isAuth) {    
    return true;
  } else {
    // Redirect to azure-login instead of /login
    return router.parseUrl('/azure-login');
  }
};