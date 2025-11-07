import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
  imports: [GameGridComponent, GameListComponent, ReactiveFormsModule],
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

  readonly groupPhases: { key: string, value: string | GroupPhase }[] = groupPhases;

  readonly groupPhase: FormControl = new FormControl<GroupPhase | undefined>(undefined);
  readonly category: FormControl = new FormControl<string | undefined>(undefined);
  readonly sortBy: FormControl = new FormControl<GameSort>('title');

  ngOnInit(): void {
    this.categoryStoreService.getCategories().subscribe();
    this.gameStoreService.getGames().subscribe();
  }

  onToggleGamesView(): void {
    this.preferenceStoreService.toggleGamesView();
  }

  onFilterGroupPhase(): void {
    this.gameStoreService.updateQueryGame({ groupPhase: this.groupPhase.value });
  }

  onFilterCategory(): void {
    this.gameStoreService.updateQueryGame({ categoryId: this.category.value });
  }

  onToggleSort(): void {
    this.gameStoreService.toggleSort(this.sortBy.value);
  }

  onOpenAddGameDialog(): void {
    this.dialogStoreService.open(AddGameComponent, 'Spielerstellung');
  }
}
