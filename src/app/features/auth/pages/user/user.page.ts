import { Component, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../core/models/user.model';
import { RolePipe } from '../../../../core/pipes/role-pipe';
import { AuthStoreService } from '../../../../core/services/auth-store.service';

@Component({
  selector: 'app-user',
  imports: [RolePipe],
  templateUrl: './user.page.html',
  styleUrl: './user.page.scss'
})
export class UserPage {
  private readonly router: Router = inject<Router>(Router);
  private readonly authStoreService: AuthStoreService = inject<AuthStoreService>(AuthStoreService);

  readonly user: Signal<User | null> = this.authStoreService.user;

  onLogOut(): void {
    this.authStoreService.logOut();
    this.router.navigate(['']);
  }
}
