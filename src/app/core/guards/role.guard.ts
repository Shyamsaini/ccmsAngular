import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (roles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const userRole = authService.getUserRole();

    if (roles.includes(userRole!)) {
      return true;
    }

    router.navigate(['/unauthorized']);
    return false;
  };
};
