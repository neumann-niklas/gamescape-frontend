import { Component, OnInit, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthStoreService } from '../../../auth/services/auth-store.service';
import { Category } from '../../../categories/models/category.model';
import { CategoryStoreService } from '../../../categories/services/category-store.service';
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
    groupPhase: new FormControl<GroupPhase>(GroupPhase.Forming),
    categories: new FormControl<Category[]>([])
  });
  readonly groupPhases: { key: string, value: string | GroupPhase }[] = groupPhases;

  readonly id: string | null;

  readonly isAuthenticated: Signal<boolean>;
  readonly categories: Signal<Category[]>;
  readonly game: Signal<Game | null>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly authStoreService: AuthStoreService,
    private readonly categoriesStoreService: CategoryStoreService,
    private readonly gameStoreService: GameStoreService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.isAuthenticated = this.authStoreService.isAuthenticated;
    this.categories = this.categoriesStoreService.categories;
    this.game = this.gameStoreService.game;
  }

  ngOnInit(): void {
    if (!this.id) return;

    forkJoin({
      categories: this.categoriesStoreService.getCategories(),
      game: this.gameStoreService.getGame(this.id)
    }).subscribe({
      next: ({ categories, game }: { categories: Category[], game: Game }) => this.updateGameFormGroup.patchValue({
        groupPhase: game.groupPhase,
        categories: this.mapCategories(game.categories, categories)
      })
    });
  }

  private mapCategories(gameCategories: Category[], categories: Category[]): Category[] {
    return gameCategories.map((gameCategory: Category) => categories.find((category: Category) => category.id === gameCategory.id))
      .filter((category: Category | undefined) => !!category);
  }

  private cleanFormValues(values: any): any {
    return Object.fromEntries(Object.entries(values).filter(([_, value]) => value !== null && value !== ''));
  }

  private areCategoriesEqual(a: Category[], b: Category[]): boolean {
    if (a.length !== b.length) return false;

    return a.map((category: Category) => category.id).sort().every((id, i) => id === b.map((category: Category) => category.id).sort()[i]);
  }

  get updateGame(): UpdateGame {
    const game = this.game();

    if (!game) return this.cleanFormValues(this.updateGameFormGroup.value);

    const updateGame: any = {};

    for (const [key, value] of Object.entries(this.cleanFormValues(this.updateGameFormGroup.value))) {
      if (key === 'categories') {
        if (!this.areCategoriesEqual(value as Category[], game.categories)) updateGame.categories = value;
      } else if (game[key as keyof Game] !== value) updateGame[key] = value;
    }

    return updateGame as UpdateGame;
  }

  get isUpdateGameValid(): boolean {
    return Object.keys(this.updateGame).length > 0;
  }

  onReset(): void {
    this.updateGameFormGroup.reset({
      groupPhase: this.game()?.groupPhase,
      categories: this.mapCategories(this.game()?.categories ?? [], this.categories())
    });
  }

  onUpdateGame(): void {
    if (!this.id) return;

    this.gameStoreService.updateGame(this.id, this.updateGame).subscribe({
      complete: () => this.router.navigate([''])
    });
  }
}
