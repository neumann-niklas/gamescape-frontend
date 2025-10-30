import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AddGame, Game, UpdateGame } from '../models/game.model';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class GameStoreService {
  private readonly gameService: GameService = inject<GameService>(GameService);

  private readonly _games: WritableSignal<Game[]> = signal<Game[]>([]);
  private readonly _game: WritableSignal<Game | null> = signal<Game | null>(null);

  readonly games: Signal<Game[]> = computed<Game[]>(() => this._games());
  readonly game: Signal<Game | null> = computed<Game | null>(() => this._game());

  addGame(addGame: AddGame): Observable<Game> {
    return this.gameService.addGame(addGame).pipe(tap({
      next: (game: Game) => this._games.set([...this._games(), game])
    }));
  }

  getGames(): Observable<Game[]> {
    return this.gameService.getGames().pipe(tap({
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
      next: (game: Game) => this._games.set(this._games().map((g: Game) => g.id === game.id ? game : g)),
      complete: () => this._game.set(null)
    }));
  }

  deleteGame(id: string): Observable<Game> {
    return this.gameService.deleteGame(id).pipe(tap({
      next: () => this._games.set(this._games().filter((game: Game) => game.id !== id)),
      complete: () => this._game.set(null)
    }));
  }
}
