import { DatePipe } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../../auth/models/user.model';
import { AuthStoreService } from '../../../auth/services/auth-store.service';
import { CategoryComponent } from '../../../categories/components/category/category.component';
import { GroupPhaseComponent } from '../../components/group-phase/group-phase.component';
import { Game } from '../../models/game.model';
import { GameStoreService } from '../../services/game-store.service';

@Component({
  selector: 'app-game',
  imports: [RouterLink, DatePipe, CategoryComponent, GroupPhaseComponent],
  templateUrl: './game.page.html',
  styleUrl: './game.page.scss'
})
export class GamePage implements OnInit {
  readonly id: string | null;

  readonly isAuthenticated: Signal<boolean>;
  readonly user: Signal<User | null>;
  readonly game: Signal<Game | null>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authStoreService: AuthStoreService,
    private readonly gameStoreService: GameStoreService,
    private readonly router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.isAuthenticated = this.authStoreService.isAuthenticated;
    this.user = this.authStoreService.user;
    this.game = this.gameStoreService.game;
  }

  ngOnInit(): void {
    if (!this.id) return;

    this.gameStoreService.getGame(this.id).subscribe();
  }

  onDeleteGame(): void {
    if (!this.id) return;

    this.gameStoreService.deleteGame(this.id).subscribe({
      complete: () => this.router.navigate([''])
    });
  }
}
