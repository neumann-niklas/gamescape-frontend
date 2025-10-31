import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupPhaseComponent } from '../../../../core/components/group-phase/group-phase.component';
import { User } from '../../../../core/models/user.model';
import { AuthStoreService } from '../../../../core/services/auth-store.service';
import { DialogStoreService } from '../../../../core/services/dialog-store.service';
import { UpdateGameComponent } from '../../components/update-game/update-game.component';
import { Game } from '../../models/game.model';
import { GameStoreService } from '../../services/game-store.service';

@Component({
  selector: 'app-game',
  imports: [GroupPhaseComponent],
  templateUrl: './game.page.html',
  styleUrl: './game.page.scss'
})
export class GamePage implements OnInit, OnDestroy {
  private readonly activatedRoute: ActivatedRoute = inject<ActivatedRoute>(ActivatedRoute);
  private readonly router: Router = inject<Router>(Router);
  private readonly authStoreService: AuthStoreService = inject<AuthStoreService>(AuthStoreService);
  private readonly dialogStoreService: DialogStoreService = inject<DialogStoreService>(DialogStoreService);
  private readonly gameStoreService: GameStoreService = inject<GameStoreService>(GameStoreService);

  private readonly id: string | null;

  readonly user: Signal<User | null> = this.authStoreService.user;
  readonly game: Signal<Game | null> = this.gameStoreService.game;

  constructor() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (!this.id) return;

    this.gameStoreService.getGame(this.id).subscribe();
  }

  ngOnDestroy(): void {
    this.gameStoreService.clearGame();
  }

  onOpenUpdateGameDialog(): void {
    this.dialogStoreService.open(UpdateGameComponent, 'Spielbearbeitung');
  }

  onDeleteGame(): void {
    if (!this.id || !this.user) return;

    const user: User | null = this.user();
    const game: Game | null = this.game();

    if (!user || !game) return;

    if (user.id === game.author.id) this.gameStoreService.deleteGame(this.id).subscribe({
      complete: () => this.router.navigate([''])
    });
  }
}
