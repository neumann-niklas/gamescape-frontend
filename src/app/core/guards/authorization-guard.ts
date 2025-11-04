import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, take } from 'rxjs';
import { Role, User } from '../models/user.model';
import { AuthStoreService } from '../services/auth-store.service';

export function authorizationGuard(role: Role): CanActivateFn {
  return () => {
    const authStoreService: AuthStoreService = inject<AuthStoreService>(AuthStoreService);

    const user: User | null = authStoreService.user();

    if (!user) return authStoreService.getUser().pipe(map((user: User) => user.role >= role), take(1));

    return user.role >= role;
  };
}