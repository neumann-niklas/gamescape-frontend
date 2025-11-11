import { Component, effect, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent, SelectOption } from '../../../../core/components/select/select.component';
import { User } from '../../../../core/models/user.model';
import { AuthStoreService } from '../../../../core/services/auth-store.service';
import { DialogStoreService } from '../../../../core/services/dialog-store.service';
import { GamesView, PreferenceStoreService } from '../../../../core/services/preference-store.service';
import { Category } from '../../../categories/models/category.model';
import { CategoryStoreService } from '../../../categories/services/category-store.service';
import { AddGameComponent } from '../../components/add-game/add-game.component';
import { GameGridComponent } from '../../components/game-grid/game-grid.component';
import { GameListComponent } from '../../components/game-list/game-list.component';
import { Game, GameSort } from '../../models/game.model';
import { GroupPhase, groupPhases } from '../../models/group-phase.model';
import { GameStoreService } from '../../services/game-store.service';

@Component({
  selector: 'app-games',
  imports: [ReactiveFormsModule, SelectComponent, GameGridComponent, GameListComponent],
  templateUrl: './games.page.html',
  styleUrl: './games.page.scss'
})
export class GamesPage implements OnInit {
  private readonly authStoreService: AuthStoreService = inject<AuthStoreService>(AuthStoreService);
  private readonly dialogStoreService: DialogStoreService = inject<DialogStoreService>(DialogStoreService);
  private readonly preferenceStoreService: PreferenceStoreService = inject<PreferenceStoreService>(PreferenceStoreService);
  private readonly categoryStoreService: CategoryStoreService = inject<CategoryStoreService>(CategoryStoreService);
  private readonly gameStoreService: GameStoreService = inject<GameStoreService>(GameStoreService);

  readonly user: Signal<User | null> = this.authStoreService.user;
  readonly gamesView: Signal<GamesView> = this.preferenceStoreService.gamesView;
  readonly categories: Signal<Category[]> = this.categoryStoreService.categories;
  readonly games: Signal<Game[]> = this.gameStoreService.games;

  readonly groupPhases: SelectOption<GroupPhase>[] = groupPhases.map(groupPhase => ({
    label: groupPhase.key, value: groupPhase.value as GroupPhase
  }));
  readonly categoryIds: WritableSignal<SelectOption[]> = signal<SelectOption[]>([]);
  readonly gameSorts: SelectOption<GameSort>[] = [
    { label: 'Titel', value: 'title' },
    { label: 'Gruppenphase', value: 'groupPhase' },
    { label: 'Datum', value: 'updateDate' }
  ];

  readonly sortBy: FormControl = new FormControl<GameSort>('title');

  constructor() {
    effect(() => {
      this.categoryIds.set(this.categories().map((category: Category) => ({ label: category.name, value: category.id })));
    });
  }

  ngOnInit(): void {
    this.categoryStoreService.getCategories().subscribe();
    this.gameStoreService.getGames().subscribe();
  }

  onToggleGamesView(): void {
    this.preferenceStoreService.toggleGamesView();
  }

  onQueryGroupPhase(selected: SelectOption<GroupPhase> | null): void {
    this.gameStoreService.updateQueryGame({ groupPhase: selected?.value ?? undefined });
  }

  onQueryCategory(selected: SelectOption | null): void {
    this.gameStoreService.updateQueryGame({ categoryId: selected?.value ?? undefined });
  }

  onQuerySortBy(selected: SelectOption<GameSort> | null): void {
    this.gameStoreService.updateQueryGame({ sortBy: selected?.value ?? undefined });
  }

  onToggleSort(): void {
    this.gameStoreService.toggleSort(this.sortBy.value);
  }

  onOpenAddGameDialog(): void {
    this.dialogStoreService.open(AddGameComponent, 'Spielerstellung');
  }
}
