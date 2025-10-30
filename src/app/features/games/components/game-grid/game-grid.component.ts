import { Component, input, InputSignal } from '@angular/core';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-grid',
  imports: [],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.scss'
})
export class GameGridComponent {
  readonly games: InputSignal<Game[]> = input.required<Game[]>();
}
