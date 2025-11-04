import { Component, inject, Signal } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { DialogComponent } from './core/components/dialog.component/dialog.component';
import { Theme } from './core/models/theme.model';
import { User } from './core/models/user.model';
import { AuthStoreService } from './core/services/auth-store.service';
import { DialogStoreService } from './core/services/dialog-store.service';
import { ThemeStoreService } from './core/services/theme-store.service';
import { LoginComponent } from './features/auth/components/login/login.component';
import { SignupComponent } from './features/auth/components/signup/signup.component';

@Component({
  selector: 'app-root',
  imports: [RouterLinkActive, RouterLinkWithHref, RouterOutlet, DialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly authStoreService: AuthStoreService = inject<AuthStoreService>(AuthStoreService);
  private readonly dialogStoreService: DialogStoreService = inject<DialogStoreService>(DialogStoreService);
  private readonly themeStoreService: ThemeStoreService = inject<ThemeStoreService>(ThemeStoreService);

  readonly user: Signal<User | null> = this.authStoreService.user;
  readonly theme: Signal<Theme> = this.themeStoreService.theme;

  onOpenLoginDialog(): void {
    this.dialogStoreService.open(LoginComponent, 'Anmeldung');
  }

  onOpenSignupDialog(): void {
    this.dialogStoreService.open(SignupComponent, 'Registrierung');
  }

  onToggleTheme(): void {
    this.themeStoreService.toggleTheme();
  }
}
