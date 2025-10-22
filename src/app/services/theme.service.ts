import { Injectable } from '@angular/core';
import { Theme, themes } from '../models/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
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
  }

  toggleTheme(): void {
    this.setTheme(this.getTheme() === Theme.Light ? Theme.Dark : Theme.Light);
  }
}
