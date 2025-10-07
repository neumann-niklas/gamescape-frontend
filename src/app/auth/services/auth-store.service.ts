import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Login } from '../models/login.model';
import { Signup } from '../models/signup.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private readonly _accessToken: WritableSignal<string | null> = signal<string | null>(null);

  readonly isAuthenticated: Signal<boolean> = computed(() => !!this._accessToken());

  constructor(private readonly authService: AuthService) {
    this.loadAccessToken();
  }

  private loadAccessToken(): void {
    const accessToken: string | null = localStorage.getItem('accessToken');

    if (!accessToken) return;

    this._accessToken.set(accessToken);
  }

  signUp(signup: Signup): void {
    this.authService.signUp(signup).subscribe({
      next: ({ accessToken }: { accessToken: string }) => {
        this._accessToken.set(accessToken);
        localStorage.setItem('accessToken', accessToken);
      }
    });
  }

  logIn(login: Login): void {
    this.authService.logIn(login).subscribe({
      next: ({ accessToken }: { accessToken: string }) => {
        this._accessToken.set(accessToken);
        localStorage.setItem('accessToken', accessToken);
      }
    });
  }

  logOut(): void {
    this._accessToken.set(null);
    localStorage.removeItem('accessToken');
  }
}
