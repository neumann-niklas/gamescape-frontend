import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthStoreService } from '../../../../core/services/auth-store.service';
import { GameStoreService } from '../../services/game-store.service';

@Component({
  selector: 'app-game.page',
  imports: [],
  templateUrl: './game.page.html',
  styleUrl: './game.page.scss'
})
export class GamePage {
  private readonly activatedRoute: ActivatedRoute = inject<ActivatedRoute>(ActivatedRoute);
  private readonly authStoreService: AuthStoreService = inject<AuthStoreService>(AuthStoreService);
  private readonly gameStoreService: GameStoreService = inject<GameStoreService>(GameStoreService);
}
