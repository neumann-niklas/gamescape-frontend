import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { Auth, Login, Signup } from '../models/auth.model';
import { UpdateUser, User } from '../models/user.model';
import { AuthService } from './auth.service';

export const ACCESS_TOKEN_KEY: string = 'accessToken';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private readonly authService: AuthService = inject<AuthService>(AuthService);

  private readonly _auth: WritableSignal<Auth | null> = signal<Auth | null>(null);
  private readonly _user: WritableSignal<User | null> = signal<User | null>(null);

  readonly auth: Signal<Auth | null> = computed<Auth | null>(() => this._auth());
  readonly user: Signal<User | null> = computed<User | null>(() => this._user());

  async loadAuth(): Promise<void> {
    const accessToken: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!accessToken) return;

    this._auth.set({ accessToken: accessToken });

    try {
      await firstValueFrom(this.getUser())
    } catch {
      this.logOut();
    }
  }

  signUp(signup: Signup): Observable<Auth> {
    return this.authService.signUp(signup).pipe(tap({
      next: (auth: Auth) => {
        this._auth.set(auth);
        localStorage.setItem(ACCESS_TOKEN_KEY, auth.accessToken);
      },
      complete: () => this.getUser().subscribe()
    }));
  }

  logIn(login: Login): Observable<Auth> {
    return this.authService.logIn(login).pipe(tap({
      next: (auth: Auth) => {
        this._auth.set(auth);
        localStorage.setItem(ACCESS_TOKEN_KEY, auth.accessToken);
      },
      complete: () => this.getUser().subscribe()
    }));
  }

  getUser(): Observable<User> {
    return this.authService.getUser().pipe(tap({
      next: (user: User) => this._user.set(user)
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
      complete: () => this.logOut()
    }));
  }

  logOut(): void {
    this._auth.set(null);
    this._user.set(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}
