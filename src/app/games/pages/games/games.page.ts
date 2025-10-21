import { Component, OnInit, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../../auth/models/user.model';
import { AuthStoreService } from '../../../auth/services/auth-store.service';
import { GameGridComponent } from '../../components/game-grid/game-grid.component';
import { GameListComponent } from '../../components/game-list/game-list.component';
import { Game } from '../../models/game.model';
import { GamePreferenceStoreService, ViewType } from '../../services/game-preference-store.service';
import { GameStoreService } from '../../services/game-store.service';

@Component({
  selector: 'app-games',
  imports: [RouterModule, GameGridComponent, GameListComponent],
  templateUrl: './games.page.html',
  styleUrl: './games.page.scss'
})
export class GamesPage implements OnInit {
  readonly games: Signal<Game[]>;

  readonly viewType: Signal<ViewType>;

  readonly isAuthenticated: Signal<boolean>;
  readonly user: Signal<User | null>;

  constructor(
    private readonly authStoreService: AuthStoreService,
    private readonly gamePreferenceStoreService: GamePreferenceStoreService,
    private readonly gameStoreService: GameStoreService
  ) {
    this.games = this.gameStoreService.games;

    this.viewType = this.gamePreferenceStoreService.viewType;

    this.isAuthenticated = this.authStoreService.isAuthenticated;
    this.user = this.authStoreService.user;
  }

  ngOnInit(): void {
    this.gameStoreService.getGames().subscribe();
  }

  toggleView() {
    this.gamePreferenceStoreService.setViewType((this.viewType() === 'grid') ? 'list' : 'grid');
  }

  onDeleteGame(id: string): void {
    this.gameStoreService.deleteGame(id).subscribe();
  }
}
