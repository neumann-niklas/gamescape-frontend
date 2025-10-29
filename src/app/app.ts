import { Component, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Theme } from './core/models/theme.model';
import { User } from './core/models/user.model';
import { AuthStoreService } from './core/services/auth-store.service';
import { ThemeStoreService } from './core/services/theme-store.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly authStoreService: AuthStoreService = inject<AuthStoreService>(AuthStoreService);
  private readonly themeStoreService: ThemeStoreService = inject<ThemeStoreService>(ThemeStoreService);

  readonly user: Signal<User | null> = this.authStoreService.user;
  readonly theme: Signal<Theme> = this.themeStoreService.theme;

  onLogOut(): void {
    this.authStoreService.logOut();
  }

  onToggleTheme(): void {
    this.themeStoreService.toggleTheme();
  }
}
