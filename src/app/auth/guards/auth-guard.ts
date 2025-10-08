import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthStoreService } from '../services/auth-store.service';

export const authGuard: CanActivateFn = () => {
  const authStoreService: AuthStoreService = inject(AuthStoreService);

  return authStoreService.isAuthenticated();
};
