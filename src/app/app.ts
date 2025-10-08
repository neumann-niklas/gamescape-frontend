import { Component, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from './auth/models/user.model';
import { AuthStoreService } from './auth/services/auth-store.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly isAuthenticated: Signal<boolean>;
  readonly user: Signal<User | null>;

  constructor(private readonly authStoreService: AuthStoreService) {
    this.isAuthenticated = this.authStoreService.isAuthenticated;
    this.user = this.authStoreService.user;
  }

  logOut(): void {
    this.authStoreService.logOut();
  }
}
