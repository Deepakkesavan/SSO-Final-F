import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../shared/services/auth-service.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated();
  console.log(authService.userSubjectOneSignal().user);

  if (isAuth) {    
    return true;
  } else {
    return router.parseUrl('/login');
  }
};
