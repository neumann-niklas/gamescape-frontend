import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogStoreService } from '../../../../core/services/dialog-store.service';
import { Category } from '../../../categories/models/category.model';
import { CategoryStoreService } from '../../../categories/services/category-store.service';
import { Game, UpdateGame } from '../../models/game.model';
import { GroupPhase, groupPhases } from '../../models/group-phase.model';
import { GameStoreService } from '../../services/game-store.service';

@Component({
  selector: 'app-update-game',
  imports: [ReactiveFormsModule],
  templateUrl: './update-game.component.html',
  styleUrl: './update-game.component.scss'
})
export class UpdateGameComponent implements OnInit {
  private readonly dialogStoreService: DialogStoreService = inject<DialogStoreService>(DialogStoreService);
  private readonly categoryStoreService: CategoryStoreService = inject<CategoryStoreService>(CategoryStoreService);
  private readonly gameStoreService: GameStoreService = inject<GameStoreService>(GameStoreService);

  readonly categories: Signal<Category[]> = this.categoryStoreService.categories;
  readonly game: Signal<Game | null> = this.gameStoreService.game;
  readonly groupPhases: { key: string, value: string | GroupPhase }[] = groupPhases

  updateGameFormGroup: FormGroup = new FormGroup({
    title: new FormControl<string | null>(null),
    groupPhase: new FormControl<GroupPhase>(GroupPhase.Forming),
    category: new FormControl<Category | null>(null)
  });

  ngOnInit(): void {
    this.categoryStoreService.getCategories().subscribe();

    this.updateGameFormGroup.patchValue({
      groupPhase: this.game()?.groupPhase ?? GroupPhase.Forming,
      category: this.game()?.category ?? null
    });
  }

  get updateGame(): UpdateGame {
    const updateGame: any = {};
    const game: Game | null = this.game();

    if (!game) return updateGame;

    for (const [key, value] of Object.entries<UpdateGame>(this.clearValues(this.updateGameFormGroup.value))) {
      if (value !== null && game[key as keyof Game] !== value) updateGame[key] = value;
    }

    return updateGame;
  }

  get isUpdateGameValid(): boolean {
    return Object.keys(this.updateGame).length > 0;
  }

  onResetUpdateGameFormGroup(): void {
    this.updateGameFormGroup.reset({
      groupPhase: this.game()?.groupPhase ?? GroupPhase.Forming,
      category: this.game()?.category ?? null
    });
  }

  onUpdateGame(): void {
    if (!this.isUpdateGameValid) return;

    const game: Game | null = this.game();

    if (!game) return;

    this.gameStoreService.updateGame(game.id, this.updateGame).subscribe({
      complete: () => this.dialogStoreService.close()
    });
  }

  private clearValues(values: any): any {
    return Object.fromEntries(Object.entries(values).filter(([_, value]) => value !== null && value !== ''));
  }
}
