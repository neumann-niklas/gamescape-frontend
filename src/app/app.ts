import { Component, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from './auth/models/user.model';
import { AuthStoreService } from './auth/services/auth-store.service';
import { Theme } from './models/theme.enum';
import { ThemeStoreService } from './services/theme-store.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly isAuthenticated: Signal<boolean>;
  readonly user: Signal<User | null>;

  readonly theme: Signal<Theme>;

  constructor(
    private readonly authStoreService: AuthStoreService,
    private readonly themeService: ThemeStoreService
  ) {
    this.isAuthenticated = this.authStoreService.isAuthenticated;
    this.user = this.authStoreService.user;

    this.theme = this.themeService.theme;
  }

  logOut(): void {
    this.authStoreService.logOut();
  }

  onToggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
