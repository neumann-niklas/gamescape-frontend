import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Theme, themes } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeStoreService {
  private readonly THEME_KEY: string = 'theme';

  private readonly _theme: WritableSignal<Theme> = signal<Theme>(Theme.Light);

  readonly theme: Signal<Theme> = computed<Theme>(() => this._theme());

  loadTheme(): void {
    this.setTheme(localStorage.getItem(this.THEME_KEY) as Theme || Theme.Light);
  }

  toggleTheme(): void {
    this.setTheme(this._theme() === Theme.Light ? Theme.Dark : Theme.Light);
  }

  private setTheme(theme: Theme): void {
    themes.forEach((t: Theme) => document.body.classList.remove(t.toLowerCase()));

    document.body.classList.add(theme.toLowerCase());
    localStorage.setItem(this.THEME_KEY, theme);

    this._theme.set(theme);
  }
}
