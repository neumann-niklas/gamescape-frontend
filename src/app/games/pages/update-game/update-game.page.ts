import { Component, OnInit, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStoreService } from '../../../auth/services/auth-store.service';
import { Game, UpdateGame } from '../../models/game.model';
import { GroupPhase, groupPhases } from '../../models/group-phase.enum';
import { GameStoreService } from '../../services/game-store.service';

@Component({
  selector: 'app-update-game',
  imports: [ReactiveFormsModule],
  templateUrl: './update-game.page.html',
  styleUrl: './update-game.page.scss'
})
export class UpdateGamePage implements OnInit {
  readonly updateGameFormGroup: FormGroup = new FormGroup({
    title: new FormControl<string | null>(null),
    groupPhase: new FormControl<GroupPhase>(GroupPhase.Forming)
  });
  readonly groupPhases: { key: string, value: string | GroupPhase }[] = groupPhases;

  readonly id: string | null;
  readonly isAuthenticated: Signal<boolean>;
  readonly game: Signal<Game | null>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly authStoreService: AuthStoreService,
    private readonly gameStoreService: GameStoreService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ?? null;
    this.isAuthenticated = this.authStoreService.isAuthenticated;
    this.game = this.gameStoreService.game;
  }

  ngOnInit(): void {
    if (!this.id) return;

    this.gameStoreService.getGame(this.id).subscribe({
      next: (game: Game) => this.updateGameFormGroup.patchValue({
        groupPhase: game.groupPhase
      })
    });
  }

  get updateGame(): UpdateGame {
    const game = this.game();

    if (!game) return Object.fromEntries(Object.entries(this.updateGameFormGroup.value).filter(([_, value]) => value !== null && value !== ''));

    return Object.fromEntries(Object.entries(this.updateGameFormGroup.value).filter(([key, value]) => value !== null && value !== '' && game[key as keyof Game] !== value));
  }

  get isUpdateGameValid(): boolean {
    return Object.keys(this.updateGame).length > 0;
  }

  onReset(): void {
    this.updateGameFormGroup.reset({
      groupPhase: this.game()?.groupPhase
    });
  }

  onUpdateGame(): void {
    if (!this.id) return;

    this.gameStoreService.updateGame(this.id, this.updateGame).subscribe({
      complete: () => this.router.navigate(['/'])
    });
  }
}
