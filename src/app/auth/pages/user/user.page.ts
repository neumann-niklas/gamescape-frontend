import { Component, Signal } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  selector: 'app-user.page',
  imports: [],
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
    this.authStoreService.updateEmail('james.doe@gamescape.de');
  }

  updatePassword(): void {
    this.authStoreService.updatePassword('newPassword');
  }

  deleteUser(): void {
    this.authStoreService.deleteUser();
  }
}
