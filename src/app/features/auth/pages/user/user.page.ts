import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStoreService } from '../../../../core/services/auth-store.service';

@Component({
  selector: 'app-user.page',
  imports: [],
  templateUrl: './user.page.html',
  styleUrl: './user.page.scss'
})
export class UserPage {
  private readonly router: Router = inject<Router>(Router);
  private readonly authStoreService: AuthStoreService = inject<AuthStoreService>(AuthStoreService);

  onLogOut(): void {
    this.authStoreService.logOut();
    this.router.navigate(['']);
  }
}
