import { Component, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  selector: 'app-user.page',
  imports: [RouterModule],
  templateUrl: './user.page.html',
  styleUrl: './user.page.scss'
})
export class UserPage {
  readonly user: Signal<User | null>;

  constructor(private readonly authStoreService: AuthStoreService) {
    this.user = this.authStoreService.user;
  }

  updateUser(): void {
    this.authStoreService.updateUser({ firstName: 'James' });
  }

  updateEmail(): void {
    const email: string | null = window.prompt('Geben Sie Ihre neue Email ein:');

    if (!email) return;

    this.authStoreService.updateEmail(email);
  }

  updatePassword(): void {
    const password: string | null = window.prompt('Geben Sie Ihr neues Passwort ein:');

    if (!password) return;

    this.authStoreService.updatePassword(password);
  }

  deleteUser(): void {
    window.confirm('Möchten Sie Ihren Benutzer wirklich löschen?') && this.authStoreService.deleteUser();
  }
}
