import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Login } from '../models/login.model';
import { Signup } from '../models/signup.model';
import { UpdateUser, User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private readonly accessTokenKey: string = 'accessToken';

  private readonly _accessToken: WritableSignal<string | null> = signal<string | null>(null);
  private readonly _user: WritableSignal<User | null> = signal<User | null>(null);

  readonly isAuthenticated: Signal<boolean> = computed(() => !!this._accessToken());
  readonly user: Signal<User | null> = computed(() => this._user());

  constructor(private readonly authService: AuthService) {
    this.loadAccessToken();
  }

  private loadAccessToken(): void {
    const accessToken: string | null = localStorage.getItem(this.accessTokenKey);

    if (!accessToken) return;

    this._accessToken.set(accessToken);
    this.getUser().subscribe();
  }

  signUp(signup: Signup): Observable<{ accessToken: string }> {
    return this.authService.signUp(signup).pipe(tap({
      next: ({ accessToken }: { accessToken: string }) => {
        this._accessToken.set(accessToken);
        localStorage.setItem(this.accessTokenKey, accessToken);
      },
      error: () => {
        this._accessToken.set(null);
        this._user.set(null);
        localStorage.removeItem(this.accessTokenKey);
      },
      complete: () => this.getUser().subscribe()
    }));
  }

  logIn(login: Login): Observable<{ accessToken: string }> {
    return this.authService.logIn(login).pipe(tap({
      next: ({ accessToken }: { accessToken: string }) => {
        this._accessToken.set(accessToken);
        localStorage.setItem(this.accessTokenKey, accessToken);
      },
      error: () => {
        this._accessToken.set(null);
        this._user.set(null);
        localStorage.removeItem(this.accessTokenKey);
      },
      complete: () => this.getUser().subscribe()
    }));
  }

  getUser(): Observable<User> {
    return this.authService.getUser().pipe(tap({
      next: (user: User) => this._user.set(user),
      error: () => this._user.set(null)
    }));
  }

  updateUser(updateUser: UpdateUser): Observable<User> {
    return this.authService.updateUser(updateUser).pipe(tap({
      next: (user: User) => this._user.set(user)
    }));
  }

  updateEmail(email: string): Observable<User> {
    return this.authService.updateEmail(email).pipe(tap({
      next: (user: User) => this._user.set(user)
    }));
  }

  updatePassword(password: string): Observable<User> {
    return this.authService.updatePassword(password).pipe(tap({
      next: (user: User) => this._user.set(user)
    }));
  }

  deleteUser(): Observable<User> {
    return this.authService.deleteUser().pipe(tap({
      next: () => this.logOut()
    }));
  }

  logOut(): void {
    this._accessToken.set(null);
    this._user.set(null);
    localStorage.removeItem(this.accessTokenKey);
  }
}
