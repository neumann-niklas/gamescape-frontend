import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Login } from '../models/login.model';
import { Signup } from '../models/signup.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private readonly _accessToken: WritableSignal<string | null> = signal<string | null>(null);
  private readonly _user: WritableSignal<User | null> = signal<User | null>(null);

  readonly isAuthenticated: Signal<boolean> = computed(() => !!this._accessToken());
  readonly user: Signal<User | null> = computed(() => this._user());

  constructor(private readonly authService: AuthService) {
    this.loadAccessToken();
  }

  private loadAccessToken(): void {
    const accessToken: string | null = localStorage.getItem('accessToken');

    if (!accessToken) return;

    this._accessToken.set(accessToken);
    this.getUser();
  }

  signUp(signup: Signup): void {
    this.authService.signUp(signup).subscribe({
      next: ({ accessToken }: { accessToken: string }) => {
        this._accessToken.set(accessToken);
        localStorage.setItem('accessToken', accessToken);
      },
      error: () => {
        this._accessToken.set(null);
        this._user.set(null);
        localStorage.removeItem('accessToken');
      },
      complete: () => this.getUser()
    });
  }

  logIn(login: Login): void {
    this.authService.logIn(login).subscribe({
      next: ({ accessToken }: { accessToken: string }) => {
        this._accessToken.set(accessToken);
        localStorage.setItem('accessToken', accessToken);
      },
      error: () => {
        this._accessToken.set(null);
        this._user.set(null);
        localStorage.removeItem('accessToken');
      },
      complete: () => this.getUser()
    });
  }

  getUser(): void {
    this.authService.getUser().subscribe({
      next: (user: User) => this._user.set(user),
      error: () => this._user.set(null)
    });
  }

  logOut(): void {
    this._accessToken.set(null);
    this._user.set(null);
    localStorage.removeItem('accessToken');
  }
}
