import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AddGame, Game, UpdateGame } from '../models/game.model';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class GameStoreService {
  private readonly _games: WritableSignal<Game[]> = signal([]);
  private readonly _game: WritableSignal<Game | null> = signal(null);

  readonly games: Signal<Game[]> = computed(() => this._games());
  readonly game: Signal<Game | null> = computed(() => this._game());

  constructor(private readonly gameService: GameService) { }

  addGame(addGame: AddGame): Observable<Game> {
    return this.gameService.addGame(addGame).pipe(tap({
      next: (game: Game) => this._games.set([...this._games(), game])
    }));
  }

  getGame(id: string): Observable<Game> {
    return this.gameService.getGame(id).pipe(tap({
      next: (game: Game) => this._game.set(game)
    }));
  }

  getGames(): Observable<Game[]> {
    return this.gameService.getGames().pipe(tap({
      next: (games: Game[]) => this._games.set(games)
    }));
  }

  updateGame(id: string, updateGame: UpdateGame): Observable<Game> {
    return this.gameService.updateGame(id, updateGame).pipe(tap({
      next: (game: Game) => this._games.set(this._games().map((g: Game) => g.id === game.id ? game : g))
    }));
  }

  deleteGame(id: string): Observable<Game> {
    return this.gameService.deleteGame(id).pipe(tap({
      next: () => this._games.set(this._games().filter((g: Game) => g.id !== id))
    }));
  }
}
