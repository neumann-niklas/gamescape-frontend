import { Component, OnInit, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../../auth/models/user.model';
import { AuthStoreService } from '../../../auth/services/auth-store.service';
import { Game } from '../../models/game.model';
import { GroupPhasePipe } from '../../pipes/group-phase.pipe';
import { GameStoreService } from '../../services/game-store.service';

@Component({
  selector: 'app-games',
  imports: [RouterModule, GroupPhasePipe],
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

  onDeleteGame(id: string): void {
    this.gameStoreService.deleteGame(id).subscribe();
  }
}
