import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

export type GamesView = 'grid' | 'list';

@Injectable({
  providedIn: 'root'
})
export class PreferenceStoreService {
  private readonly GAMES_VIEW_KEY: string = 'gamesView';

  private readonly _gamesView: WritableSignal<GamesView> = signal('grid');

  readonly gamesView: Signal<GamesView> = computed(() => this._gamesView());

  loadPreference(): void {
    this.setGamesView(localStorage.getItem(this.GAMES_VIEW_KEY) as GamesView ?? 'grid');
  }

  toggleGamesView(): void {
    this.setGamesView(this._gamesView() === 'grid' ? 'list' : 'grid');
  }

  setGamesView(gamesView: GamesView): void {
    this._gamesView.set(gamesView);
    localStorage.setItem(this.GAMES_VIEW_KEY, gamesView);
  }
}
