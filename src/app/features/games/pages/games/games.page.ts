import { Component, inject, OnInit, Signal } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { AuthStoreService } from '../../../../core/services/auth-store.service';
import { DialogStoreService } from '../../../../core/services/dialog-store.service';
import { AddGameComponent } from '../../components/add-game/add-game.component';
import { Game } from '../../models/game.model';
import { GameStoreService } from '../../services/game-store.service';

@Component({
  selector: 'app-games',
  imports: [],
  templateUrl: './games.page.html',
  styleUrl: './games.page.scss'
})
export class GamesPage implements OnInit {
  private readonly authStoreService: AuthStoreService = inject<AuthStoreService>(AuthStoreService);
  private readonly dialogStoreService: DialogStoreService = inject<DialogStoreService>(DialogStoreService);
  private readonly gameStoreService: GameStoreService = inject<GameStoreService>(GameStoreService);

  readonly user: Signal<User | null> = this.authStoreService.user;
  readonly games: Signal<Game[]> = this.gameStoreService.games;

  ngOnInit(): void {
    this.gameStoreService.getGames().subscribe();
  }

  onOpenAddGameDialog(): void {
    this.dialogStoreService.open(AddGameComponent);
  }
}
