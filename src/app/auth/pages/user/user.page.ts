import { Component, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  selector: 'app-user',
  imports: [RouterModule],
  templateUrl: './user.page.html',
  styleUrl: './user.page.scss'
})
export class UserPage {
  readonly user: Signal<User | null>;

  constructor(
    private readonly router: Router,
    private readonly authStoreService: AuthStoreService
  ) {
    this.user = this.authStoreService.user;
  }

  onDeleteUser(): void {
    window.confirm('Möchten Sie Ihren Benutzer wirklich löschen?') && this.authStoreService.deleteUser().subscribe({
      complete: () => this.router.navigate(['/'])
    });
  }
}
