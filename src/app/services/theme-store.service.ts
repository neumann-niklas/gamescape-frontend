import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Theme, themes } from '../models/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeStoreService {
  private readonly _theme: WritableSignal<Theme> = signal<Theme>(Theme.Light);
  readonly theme: Signal<Theme> = computed<Theme>(() => this._theme());

  constructor() {
    this.loadTheme();
  }

  private loadTheme(): void {
    this.setTheme(this.getTheme());
  }

  private getTheme(): Theme {
    return localStorage.getItem('theme') as Theme || Theme.Light;
  }

  private setTheme(theme: Theme): void {
    themes.forEach((t: Theme) => document.body.classList.remove(t));

    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);

    this._theme.set(theme);
  }

  toggleTheme(): void {
    this.setTheme(this.getTheme() === Theme.Light ? Theme.Dark : Theme.Light);
  }
}
