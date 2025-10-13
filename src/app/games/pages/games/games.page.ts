import { Component, OnInit, Signal } from '@angular/core';
import { User } from '../../../auth/models/user.model';
import { AuthStoreService } from '../../../auth/services/auth-store.service';
import { Game } from '../../models/game.model';
import { GameStoreService } from '../../services/game-store.service';

@Component({
  selector: 'app-games.page',
  imports: [],
  templateUrl: './games.page.html',
  styleUrl: './games.page.scss'
})
export class GamesPage implements OnInit {
  readonly games: Signal<Game[]>;

  readonly isAuthenticated: Signal<boolean>;
  readonly user: Signal<User | null>;

  constructor(
    private readonly authStoreService: AuthStoreService,
    private readonly gameStoreService: GameStoreService
  ) {
    this.games = this.gameStoreService.games;
    this.isAuthenticated = this.authStoreService.isAuthenticated;
    this.user = this.authStoreService.user;
  }

  ngOnInit(): void {
    this.gameStoreService.getGames().subscribe();
  }

  onAddGame(): void {
    this.gameStoreService.addGame({ title: 'Foo' }).subscribe();
  }

  onUpdateGame(id: string): void {
    this.gameStoreService.updateGame(id, { title: 'Bar' }).subscribe();
  }

  onDeleteGame(id: string): void {
    this.gameStoreService.deleteGame(id).subscribe();
  }
}
