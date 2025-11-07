import { computed, effect, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { AddGame, Game, GameSort, QueryGame, UpdateGame } from '../models/game.model';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class GameStoreService {
  private readonly gameService: GameService = inject<GameService>(GameService);

  private readonly _games: WritableSignal<Game[]> = signal<Game[]>([]);
  private readonly _game: WritableSignal<Game | null> = signal<Game | null>(null);
  private readonly _queryGame: WritableSignal<QueryGame> = signal<QueryGame>({});

  readonly games: Signal<Game[]> = computed<Game[]>(() => this._games());
  readonly game: Signal<Game | null> = computed<Game | null>(() => this._game());
  readonly queryGame: Signal<QueryGame> = computed<QueryGame>(() => this._queryGame());

  constructor() {
    effect((onCleanup) => {
      const subscription: Subscription = this.getGames(this._queryGame()).subscribe();

      onCleanup(() => subscription.unsubscribe());
    });
  }

  addGame(addGame: AddGame): Observable<Game> {
    return this.gameService.addGame(addGame).pipe(tap({
      next: (game: Game) => this._games.set([...this._games(), game])
    }));
  }

  getGames(queryGame?: QueryGame): Observable<Game[]> {
    return this.gameService.getGames(queryGame).pipe(tap({
      next: (games: Game[]) => this._games.set(games)
    }));
  }

  getGame(id: string): Observable<Game> {
    return this.gameService.getGame(id).pipe(tap({
      next: (game: Game) => this._game.set(game)
    }));
  }

  updateGame(id: string, updateGame: UpdateGame): Observable<Game> {
    return this.gameService.updateGame(id, updateGame).pipe(tap({
      next: (game: Game) => {
        this._games.set(this._games().map((g: Game) => g.id === game.id ? game : g));
        this._game.set(game);
      }
    }));
  }

  deleteGame(id: string): Observable<Game> {
    return this.gameService.deleteGame(id).pipe(tap({
      next: () => this._games.set(this._games().filter((game: Game) => game.id !== id)),
      complete: () => this._game.set(null)
    }));
  }

  updateQueryGame(queryGame: QueryGame): void {
    this._queryGame.update((q: QueryGame) => ({ ...q, ...queryGame }));
  }

  toggleSort(sortBy: GameSort): void {
    this._queryGame.update((queryGame: QueryGame) => ({
      ...queryGame,
      sortBy: sortBy,
      sortOrder: queryGame.sortBy === sortBy && queryGame.sortOrder === 'ASC' ? 'DESC' : 'ASC'
    }));
  }

  clearGame(): void {
    this._game.set(null);
  }
}
