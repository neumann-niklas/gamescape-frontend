import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStoreService } from './auth/services/auth-store.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly isAuthenticated: Signal<boolean>;

  constructor(private readonly authStoreService: AuthStoreService) {
    this.isAuthenticated = this.authStoreService.isAuthenticated;
  }

  logOut(): void {
    this.authStoreService.logOut();
  }
}
