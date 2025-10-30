import { Component, input, InputSignal } from '@angular/core';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-list',
  imports: [],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent {
  readonly games: InputSignal<Game[]> = input.required<Game[]>();
}
