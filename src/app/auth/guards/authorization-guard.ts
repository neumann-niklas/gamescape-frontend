import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, take } from 'rxjs';
import { Role } from '../models/role.enum';
import { User } from '../models/user.model';
import { AuthStoreService } from '../services/auth-store.service';

export function authorizationGuard(role: Role): CanActivateFn {
  return () => {
    const authStoreService: AuthStoreService = inject(AuthStoreService);

    const user: User | null = authStoreService.user();

    return user ? user.role >= role : authStoreService.getUser().pipe(map((user: User) => user.role >= role), take(1));
  };
}
