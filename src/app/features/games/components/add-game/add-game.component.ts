import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogStoreService } from '../../../../core/services/dialog-store.service';
import { Category } from '../../../categories/models/category.model';
import { CategoryStoreService } from '../../../categories/services/category-store.service';
import { GroupPhase, groupPhases } from '../../models/group-phase.model';
import { GameStoreService } from '../../services/game-store.service';

@Component({
  selector: 'app-add-game',
  imports: [ReactiveFormsModule],
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.scss'
})
export class AddGameComponent implements OnInit {
  private readonly dialogStoreService: DialogStoreService = inject<DialogStoreService>(DialogStoreService);
  private readonly categoryStoreService: CategoryStoreService = inject<CategoryStoreService>(CategoryStoreService);
  private readonly gameStoreService: GameStoreService = inject<GameStoreService>(GameStoreService);

  readonly groupPhases: { key: string, value: string | GroupPhase }[] = groupPhases;
  readonly categories: Signal<Category[]> = this.categoryStoreService.categories;

  readonly addGameFormGroup: FormGroup = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    groupPhase: new FormControl<GroupPhase>(GroupPhase.Forming),
    category: new FormControl<Category | null>(null, [Validators.required])
  });

  ngOnInit(): void {
    this.categoryStoreService.getCategories().subscribe();
  }

  onAddGame(): void {
    if (this.addGameFormGroup.invalid) return;

    this.gameStoreService.addGame(this.addGameFormGroup.value).subscribe({
      complete: () => this.dialogStoreService.close()
    });
  }
}
