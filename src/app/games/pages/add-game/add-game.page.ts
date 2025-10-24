import { Component, OnInit, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStoreService } from '../../../auth/services/auth-store.service';
import { Category } from '../../../categories/models/category.model';
import { CategoryStoreService } from '../../../categories/services/category-store.service';
import { GroupPhase, groupPhases } from '../../models/group-phase.enum';
import { GameStoreService } from '../../services/game-store.service';

@Component({
  selector: 'app-add-game',
  imports: [ReactiveFormsModule],
  templateUrl: './add-game.page.html',
  styleUrl: './add-game.page.scss'
})
export class AddGamePage implements OnInit {
  readonly addGameFormGroup: FormGroup = new FormGroup({
    title: new FormControl<string | null>(null, [Validators.required]),
    groupPhase: new FormControl<GroupPhase>(GroupPhase.Forming),
    categories: new FormControl<Category[]>([], [Validators.required])
  });
  readonly groupPhases: { key: string, value: string | GroupPhase }[] = groupPhases;

  readonly isAuthenticated: Signal<boolean>;
  readonly categories: Signal<Category[]>;

  constructor(
    private readonly router: Router,
    private readonly authStoreService: AuthStoreService,
    private readonly categoryStoreService: CategoryStoreService,
    private readonly gameStoreService: GameStoreService
  ) {
    this.isAuthenticated = this.authStoreService.isAuthenticated;
    this.categories = this.categoryStoreService.categories;
  }

  ngOnInit(): void {
    this.categoryStoreService.getCategories().subscribe();
  }

  onAddGame(): void {
    if (this.addGameFormGroup.invalid) return;

    this.gameStoreService.addGame(this.addGameFormGroup.value).subscribe({
      complete: () => this.router.navigate(['/'])
    });
  }
}
